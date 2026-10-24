import {test, expect} from "@playwright/test"
import RegisterPage from "../Page/RegisterPage.js"
import LoginPage from "../Page/LoginPage.js"
import HomePage from "../Page/HomePage.js"
import Nav_BarPage from "../Page/Nav_BarPage.js"
import data from "../Data/users.json"
import stats from "../Data/invalid.json"


test("Validate sucessful login with valid credentials in SUT", async({page})=>{
    const homepage= new HomePage(page);
    const loginpage= new LoginPage(page);

    await homepage.Launch_Application(data.validUser.sut_url);
    await homepage.Navigate_to_Signin_Page();
    await loginpage.valid_login(data.validUser.username, data.validUser.password);
    await expect (page).toHaveURL("https://practicesoftwaretesting.com/account")
    await page.waitForTimeout(3000)
})


for (const realdata of stats.InvalidloginScenarios){
    test(`login fails: ${realdata.label}`, async({page})=>{
        const homepage = new HomePage(page)
        const loginpage = new LoginPage(page)

        await homepage.Launch_Application();
        await homepage.Navigate_to_Signin_Page();
        await loginpage.invalid_login(realdata.username, realdata.password);
        await expect(page.getByText("Invalid email or password")).toBeVisible();
        await expect(page).toHaveURL("https://practicesoftwaretesting.com/auth/login");


    })
}

test("Validate sucessfully registration with valid data in SUT", async({page})=>{
    const homepage= new HomePage(page);
    const loginpage= new LoginPage(page);
    const registerpage= new RegisterPage(page);

    await homepage.Launch_Application();
    await homepage.Navigate_to_Signin_Page();
    await loginpage.navigate_to_registration_Page();
    await registerpage.Valid_Registration_Credentials(data.newregistration);
    await expect(page.getByRole("heading", {name:"Login"})).toBeVisible();
})


for (const boundary of stats.DOB_BoundaryScenario){
    test(`dob scenario: ${boundary.label}`, async({page})=>{
         const homepage= new HomePage(page);
    const loginpage= new LoginPage(page);
    const registerpage= new RegisterPage(page)

    await homepage.Launch_Application();
    await homepage.Navigate_to_Signin_Page();
    await loginpage.navigate_to_registration_Page();
    await registerpage.Invalid_Registration_Credentials(boundary);
    

    if (boundary.expectSucess){
        await expect (page.getByRole("heading", {name:"Login"})).toBeVisible();
    }
    if (boundary.expectError){
        await expect(page.getByText(boundary.expectError)).toBeVisible();
    }
    })
}


test("Validate sucessful user logout", async({page})=>{
    const homepage= new HomePage(page);
    const loginpage= new LoginPage(page);
    const nav_barpage= new Nav_BarPage(page);

    await homepage.Launch_Application();
    await homepage.Navigate_to_Signin_Page();
    await loginpage.valid_login(data.validUser.username, data.validUser.password);
    await nav_barpage.Logout_User();
    await expect (page).toHaveURL("https://practicesoftwaretesting.com/auth/login");
    await page.waitForTimeout(8000);

})


/* test("Validate that login fails with incorrect password", async({page})=>{
    const homepage= new HomePage(page);
    const loginpage= new LoginPage(page);


    await homepage.Launch_Application();
    await homepage.Navigate_to_Signin_Page();
    await loginpage.invalid_login(data.invalidUser.username, data.invalidUser.password);
    await expect(page.getByText("Invalid email or password")).toBeVisible();
    await expect(page).toHaveURL("https://practicesoftwaretesting.com/auth/login");
    await page.waitForTimeout(3000)
}) */