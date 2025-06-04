import { exec } from 'child_process';

export function runUFTBatFile() {
  console.log('Running runUFTBatFile() now...');
  
  return new Promise((resolve, reject) => {
    exec('cmd /c "C:\\demo\\Execute.bat"', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        resolve;
      }
      console.log(`UFT Execution Output:\n${stdout}`);
    });
  });
}