import {test, expect} from "@playwright/test"
import HomePage from "../Page/HomePage.js"
import LoginPage from "../Page/LoginPage.js"
import CartPage from "../Page/CartPage.js"
import FavoritiesPage from "../Page/FavoritesPage.js"
import Nav_BarPage from "../Page/Nav_BarPage.js"
import data from "../Data/users.json"

test("Validate that customer can sucessfully add product to favorites", async({page})=>{
    const homepage=new HomePage(page);
    const loginpage=new LoginPage(page);
    const cartpage=new CartPage(page);
    const favoritiespage=new FavoritiesPage(page);
    const nav_barpage=new Nav_BarPage(page);

    await homepage.Launch_Application(data.validUser.sut_url);
    await homepage.Navigate_to_Signin_Page();
    await page.waitForTimeout(4000);
    await loginpage.valid_login(data.validUser.username, data.validUser.password);
    await page.waitForTimeout(4000);
    await homepage.Navigate_to_HomePage();
    await cartpage.Product_Inclusion();
    await favoritiespage.successful_Product_Fav();
    await nav_barpage.Favorite_Product();
    await expect(page.getByText("Slip Joint Pliers"));
})

test("Validate that favourites require login", async({page})=>{
    const homepage=new HomePage(page);
    const cartpage=new CartPage(page);
    const favoritiespage=new FavoritiesPage(page);

    await homepage.Launch_Application(data.validUser.sut_url);
    await homepage.Navigate_to_HomePage();
    await cartpage.Product_Inclusion();
    await favoritiespage.successful_Product_Fav();
    await expect(page.getByText("Unauthorized, can not add product to your favorite list."));


})

