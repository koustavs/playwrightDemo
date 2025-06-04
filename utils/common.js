const fs = require('fs-extra');
const fsp = require('fs').promises;
const path = require('path');
const archiver=require('archiver');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

class common {
    constructor(evidenceDir = 'evidence') {
        this.steps = [];
        this.evidenceDir = evidenceDir;
        this.createdPDFs=[];
        fs.ensureDirSync(this.evidenceDir);
    }

    async highlightElement(locator) {
        await locator.evaluate((element) => {

            // Save original styles
            const originalOutline = element.style.outline;
            const originalBg = element.style.backgroundColor;

            // Apply highlight
            element.style.outline = '3px solid red';
            element.style.backgroundColor = 'yellow';
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Store on element temporarily
            element.dataset._originalOutline = originalOutline;
            element.dataset._originalBg = originalBg;
        });
    }

    async removeHighlight(locator) {
        await locator.evaluate((element) => {
            //   const element = document.querySelector(sel);
            //   if (!element) return;

            // Restore original styles
            element.style.outline = element.dataset._originalOutline || '';
            element.style.backgroundColor = element.dataset._originalBg || '';

            delete element.dataset._originalOutline;
            delete element.dataset._originalBg;
        });
    }

    async highLightElementDuration(page, locator, duration = 300) {

        await page.evaluate((element) => {
            const originalBorder = element.style.border;
            const originalBg = element.style.backgroundColor;
            element.style.border = '3px solid red';
            element.style.backgroundColor = 'yellow';
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.dataset._originalBorder = originalBorder;
            element.dataset._originalBg = originalBg;
        }, await locator.elementHandle());
        await page.waitForTimeout(duration);

        await page.evaluate((element) => {
            element.style.border = element.dataset._originalBorder || '';
            element.style.backgroundColor = element.dataset._originalBg || '';
        }, await locator.elementHandle());
    }

    async captureScreenshot(page, customDescription, maskLocator = null) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const title = await page.title();
        const url = page.url();

        const filename = `${timestamp}-${customDescription.replace(/\s+/g, '_')}.png`;
        const filepath = path.join(this.evidenceDir, filename);
        await page.screenshot({ path: filepath, fullPage: false });
        let screenshotOptions = { path: filepath, fullPage: false, maskColor: '#b6ff00' };

        if (maskLocator) {
            // Playwright allows array of locators or a single one
            screenshotOptions.mask = Array.isArray(maskLocator) ? maskLocator : [maskLocator];
            // screenshotOptions.maskColor='#b6ff00';
        }

        await page.screenshot(screenshotOptions);


        this.steps.push({
            filepath,
            stepDescription: customDescription,
            title,
            url,
            timestamp
        });
    }

    async createPDF(pdfFilename = 'test_evidence.pdf',testInfo=null) {
        const pdfDoc = await PDFDocument.create();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontSize = 12;
        const margin = 20;
try{
        for (const { filepath, stepDescription, title, url, timestamp } of this.steps) {
            const imgBytes = await fs.readFile(filepath);
            const img = await pdfDoc.embedPng(imgBytes);

            const imgWidth = img.width;
            const imgHeight = img.height;

            const captionLines = [
                `Test Name: ${testInfo?.title || 'Unknown Test'}`,
                `Step: ${stepDescription}`,
                `Page Title: ${title}`,
                `Time: ${timestamp}`,
                `URL: ${url}`
            ];

            const captionHeight = (fontSize + 2) * captionLines.length + margin;
            const page = pdfDoc.addPage([imgWidth, imgHeight + captionHeight]);

            // Draw image
            page.drawImage(img, {
                x: 0,
                y: captionHeight,
                width: imgWidth,
                height: imgHeight
            });

            // Draw text block
            captionLines.forEach((line, index) => {
                page.drawText(line, {
                    x: margin,
                    y: margin + (captionLines.length - 1 - index) * (fontSize + 2),
                    size: fontSize,
                    font,
                    color: rgb(0.2, 0.2, 0.2),
                });
            });

        }

        const pdfBytes = await pdfDoc.save();
        const pdfPath = path.join(this.evidenceDir, pdfFilename);
        // this.createdPDFs.push(pdfPath);
        await fs.writeFile(pdfPath, pdfBytes);
        console.log(`Evidence PDF saved at: ${pdfPath}`);
        // this.deletePngFiles('evidence');
        // this.zipEvidence();
    }catch (err) {
        console.error('Error in createPDF(): ', err);
    }
}

    async markElement(locator, page) {
        await this.highlightElement(locator);
        await page.waitForTimeout(300);
        await this.removeHighlight(locator);
    }

    async deletePngFiles(dir) {
        try {
            const files = await fsp.readdir(dir);
            for (const file of files) {
                if (path.extname(file).toLowerCase() === '.png') {
                    await fsp.unlink(path.join(dir, file));
                    //   console.log(`Deleted: ${file}`);
                }
            }
        } catch (err) {
            console.error('Error in deletePngFiles(): ', err);
        }
    }

    generateFileName(testInfo, extension = 'pdf') {
        // const title = testInfo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const title = testInfo.title;

        const now = new Date();

        const readableTimestamp = now
            .toLocaleString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            })
            .replace(/[,:\s]/g, '-');

        const status = testInfo.status || 'unknown';
        const retrySuffix = testInfo.retry > 0 ? `_retry${testInfo.retry}` : '';

        /*const fileNames=[];
        fileNames[0]=`${title}_${status}${retrySuffix}_${readableTimestamp}.${extension}`;
        fileNames[1]=`${readableTimestamp}.zip`;

        return fileNames;*/

        return `${title}_${status.toUpperCase()}${retrySuffix}_${readableTimestamp}.${extension}`;
        
    }

    /*async zipEvidence(zipFileName = null,testInfo) {
        const fName=this.generateFileName(testInfo);
        const zipName = zipFileName || `evidence_${fName[1]}.zip`;
        const zipPath = path.join(this.evidenceDir, zipName);
      
        return new Promise((resolve, reject) => {
          const output = fs.createWriteStream(zipPath);
          const archive = archiver('zip', { zlib: { level: 9 } });
      
          output.on('close', () => {
            console.log(`Created zip: ${zipPath} (${archive.pointer()} bytes)`);
            resolve(zipPath);
          });
      
          archive.on('error', (err) => reject(err));
          archive.pipe(output);
      
          // Only zip files from this run
          this.createdPDFs.forEach(filePath => {
            archive.file(filePath, { name: path.basename(filePath) });
          });
      
          archive.finalize();
        });
      }*/
      

async setupPageCrashListener(page) {
    page.on('crash', () => {
        console.error('💥 Page crashed!');
        // Optional: Take recovery steps or save debug info
    });
}


}

module.exports = common;