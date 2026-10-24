import {test, expect} from "@playwright/test"
import HomePage from "../Page/HomePage.js"
import Nav_BarPage from "../Page/Nav_BarPage.js"
import ContactPage from "../Page/ContactPage.js"
import data from "../Data/users.json"
import stats from "../Data/invalid.json"


test("Validate successfully contact submission", async({page})=>{
    const homepage=new HomePage(page);
    const nav_barpage=new Nav_BarPage(page);
    const contactpage=new ContactPage(page);

    await homepage.Launch_Application(data.validUser.sut_url);
    await homepage.Navigate_to_HomePage();
    await nav_barpage.Contact_Naav();
    await contactpage.Successful_Contact_Submission(data.contactbio);
    await expect(page.getByText("Thanks for your message! We will contact you shortly."));
})


test ("Validate errors on empty required fields", async({page})=>{
    const homepage=new HomePage(page);
    const nav_barpage=new Nav_BarPage(page);
    const contactpage=new ContactPage(page);

    await homepage.Launch_Application(data.validUser.sut_url);
    await homepage.Navigate_to_HomePage();
    await nav_barpage.Contact_Naav();
    await contactpage.Invalid_Contact_Submission(stats.ContactEmptyScenario[0]);
    await expect(page.getByText("First name is required")).toBeVisible();
    await expect(page.getByText("Last name is required")).toBeVisible();
    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Subject is required")).toBeVisible();
    await expect(page.getByText("Message is required")).toBeVisible();

})

test("Validate message below minimum is rejected", async({page})=>{
    const homepage=new HomePage(page);
    const nav_barpage=new Nav_BarPage(page);
    const contactpage=new ContactPage(page);

    await homepage.Launch_Application(data.validUser.sut_url);
    await homepage.Navigate_to_HomePage();
    await nav_barpage.Contact_Naav();
    await contactpage.Invalid_Minimum_Sunmission(data.invalidcontactbio);
    await expect(page.getByText("Message must be minimal 50 characters")).toBeVisible();
})