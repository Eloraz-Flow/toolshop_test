import {test, expect} from "@playwright/test"
import HomePage from "../Page/HomePage.js"
import LoginPage from "../Page/LoginPage.js"
import Product_CatalogPage from "../Page/Product_CatalogPage.js"
import query from "../Data/products.json"
import data from "../Data/users.json"


test("Validate that browse category shows correct product in SUT", async({page})=>{
    const homepage= new HomePage(page);
    const product_catalogpage= new Product_CatalogPage(page);

    await homepage.Launch_Application(data.validUser.sut_url);
    await product_catalogpage.Navigate_to_HandyTools();
    await expect (page).toHaveURL("https://practicesoftwaretesting.com/category/hand-tools")

    const productCards= page.locator(".card");
    await expect(productCards).not.toHaveCount(0);

    
})

test("Validate that keyword search returns relevant results", async({page})=>{
    const homepage= new HomePage(page);
    const product_catalogpage= new Product_CatalogPage(page);

    await homepage.Launch_Application(data.validUser.sut_url);
    await homepage.Navigate_to_HomePage();
    await product_catalogpage.Valid_Product_Search(query.validproduct.Search_Query);
    await expect (page.getByRole("heading", {name: "Searched for: hammer"})).toBeVisible();


})

test("Validate that SUT refutes search with no matches", async({page})=>{
    const homepage= new HomePage(page);
    const product_catalogpage= new Product_CatalogPage(page);

    await homepage.Launch_Application(data.validUser.sut_url);
    await homepage.Navigate_to_HomePage();
    await product_catalogpage.Invalid_Product_Search(query.invlaidproduct.Search_Query);
    await expect (page.getByText("There are no products found.")).toBeVisible();
})


test("Validate that price filter shows products within range", async ({page})=>{
    const homepage= new HomePage(page);
    const product_catalogpage= new Product_CatalogPage(page);

    await homepage.Launch_Application(data.validUser.sut_url);
    await homepage.Navigate_to_HomePage();
    await homepage.Navigate_to_HandTools();
    await product_catalogpage.Successful_Price_Filter(query.pricefilter.min, query.pricefilter.max);

    const prices= await product_catalogpage.getDisplayedPrices();
    expect (prices.length).toBeGreaterThan(0);
    for (const price of prices) {
        expect(price).toBeGreaterThanOrEqual(10);
        expect(price).toBeLessThanOrEqual(50)
    }
})

test ("Validate that the sort filter shows products in High to Low order", async({page})=>{
    const homepage= new HomePage(page);
    const product_catalogpage= new Product_CatalogPage(page);

    await homepage.Launch_Application(data.validUser.sut_url);
    await homepage.Navigate_to_HomePage();
    await product_catalogpage.Sucessful_Product_Sorting(query.validsorting);

    const prices = await product_catalogpage.getDisplayedPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
})

test("Validate that Product detail page shows correct data", async({page})=>{
    const homepage= new HomePage(page);
    const product_catalogpage= new Product_CatalogPage(page);

    await homepage.Launch_Application(data.validUser.sut_url);
    await homepage.Navigate_to_HomePage();
    await product_catalogpage.Correct_Page_Details()
    await expect(page.getByRole("heading", {name: "Thor Hammer"}));
    await expect(page.getByText('11.14', { exact: true }));
})



