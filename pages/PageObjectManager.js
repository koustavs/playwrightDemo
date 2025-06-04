import { log } from 'console';
// import { LoginPage } from '../pages/LoginPage';
// import { HomePage } from '../pages/HomePage';
// import { AccountInformationPage } from '../pages/AccountInformationPage';
// import { CartPage } from '../pages/CartPage';
// import { CheckoutPage } from '../pages/CheckoutPage';
// import { ProductPage } from '../pages/ProductPage';
// import { ContactUsPage } from '../pages/ContactUsPage';
// import { OrderPlacedPage } from '../pages/OrderPlaced';
// import { PaymentPage } from '../pages/PaymentPage';
const LoginPage=require('../pages/LoginPage');
const { HomePage }=require('../pages/HomePage');
const { AccountInformationPage }=require('../pages/AccountInformationPage');
const { CartPage }=require('../pages/CartPage');
const { CheckoutPage }=require('../pages/CheckoutPage');
const { ProductPage }=require('../pages/ProductPage');
const { ContactUsPage }=require('../pages/ContactUsPage');
const { OrderPlaced }=require('../pages/OrderPlaced');
// import { OrderPlaced } from '../pages/OrderPlaced';
const { PaymentPage }=require('../pages/PaymentPage');


class PageObjectManager{

    constructor(page){

        this.page=page;
        this.Login = new LoginPage(this.page);
        this.Home = new HomePage(this.page);
        this.Account = new AccountInformationPage(this.page);
        this.Cart = new CartPage(this.page);
        this.Checkout=new CheckoutPage(this.page);
        this.Product = new ProductPage(this.page);
        this.Contact = new ContactUsPage(this.page);
        this.Order=new OrderPlaced(this.page);
        this.Payment = new PaymentPage(this.page);
        
    }

    getLoginPage(){
        this.Login;
    }

    getHomePage(){
        this.Home;
    }

    getAccountPage(){
        this.Account;
    }

    getCartPage(){
        this.Cart;
    }

    getCheckoutPage(){
        this.Checkout;
    }

    getProductPage(){
        this.Product;
    }

    getContactPage(){
        this.Contact;
    }

    getOrderPage(){
        this.Order;
    }

    getPaymentPage(){
        this.Payment;
    }

}module.exports={PageObjectManager};