import {test, expect} from "@playwright/test"
import HomePage from "../Page/HomePage.js"
import CartPage from "../Page/CartPage.js"
import LoginPage from "../Page/LoginPage.js"
import data from "../Data/users.json"
import query from "../Data/products.json"


test("Validte successfull product inclusion to cart", async({page})=>{
    const homepage=new HomePage(page);
    const cartpage=new CartPage(page);

    await homepage.Launch_Application(data.validUser.sut_url);
    await homepage.Navigate_to_HomePage();
    await cartpage.Successful_Product_Inclusion();
    await expect(page.getByText('1', { exact: true }));
})

test("Validate sucessfull quantity update in cart", async({page})=>{
    const homepage=new HomePage(page);
    const cartpage=new CartPage(page);

    await homepage.Launch_Application(data.validUser.sut_url);
    await homepage.Navigate_to_HomePage();
    await cartpage.Successful_Product_Inclusion();
    await cartpage.Navigate_to_Cart();
    await cartpage.Successful_Product_Qunatity_Update(query.validprodquantity.Product_Quantity);
    await expect(page.getByText("27.51")).toBeVisible();
})

test("Validate successful product removal from cart", async({page})=>{
    const homepage=new HomePage(page);
    const cartpage=new CartPage(page);

    await homepage.Launch_Application(data.validUser.sut_url);
    await homepage.Navigate_to_HomePage();
    await cartpage.Successful_Product_Inclusion();
    await cartpage.Navigate_to_Cart();
    await cartpage.Successful_Product_Removal();
    await expect(page.getByText("The cart is empty. Nothing to display.")).toBeVisible();
})


test("Validate that product quantity cannot exceed stock", async({page})=>{
    const homepage=new HomePage(page);
    const cartpage=new CartPage(page);

    await homepage.Launch_Application(data.validUser.sut_url);
    await homepage.Navigate_to_HomePage();
    await cartpage.Navigate_to_Limited_Product();
    await cartpage.Valid_Limited_Stock();
    await cartpage.Add_To_Cart();
    await expect(page.getByText("You can only have one Thor Hammer in the cart."));
    await expect (page).toHaveURL("https://practicesoftwaretesting.com/product/01M101DDMA78WJ6W6ZYBFE21K2");
})

test("Validate complete checkout as loggedin user", async({page})=>{
    const homepage=new HomePage(page);
    const cartpage=new CartPage(page);
    const loginpage = new LoginPage(page);

    await homepage.Launch_Application(data.validUser.sut_url);
    await homepage.Navigate_to_Signin_Page();
    await page.waitForTimeout(4000);
    await loginpage.valid_login(data.validUser.username, data.validUser.password);
    await page.waitForTimeout(4000);
    await homepage.Navigate_to_HomePage();
    await cartpage.Successful_Product_Inclusion();
    await cartpage.Navigate_to_Cart();
    await cartpage.Successful_Checkout_Bio(data.checkoutbio);
    await cartpage.successful_Checkout_Payment(data.paymentoption.valid_option)
    await page.waitForTimeout(2000);
    await cartpage.Checkout_Conformation();
    await page.waitForTimeout(2000);
    await expect(page.getByText("Thanks for your order!")).toBeVisible();

})


