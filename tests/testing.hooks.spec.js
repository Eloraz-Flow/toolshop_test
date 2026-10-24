import {test, expect} from "@playwright/test"
import HomePage from "../Page/HomePage.js"
import Nav_BarPage from "../Page/Nav_BarPage.js"
import ContactPage from "../Page/ContactPage.js"
import data from "../Data/users.json"
import stats from "../Data/invalid.json"


let page, homepage, nav_barpage, contactpage;

test.beforeEach(async({page: p})=>{
    page= p;
    homepage= new HomePage(page);
    nav_barpage= new Nav_BarPage(page);
    contactpage= new ContactPage(page);

    await homepage.Launch_Application(data.validUser.sut_url);
    await homepage.Navigate_to_HomePage();
    await nav_barpage.Contact_Naav();

});

test("Validate successful contact submission", async()=>{
    await contactpage.Successful_Contact_Submission(data.contactbio);
    await expect(page.getByText("Thanks for your message! We will contact you shortly.")).toBeVisible();
});

test("Validate errors on empty required fields", async () => {
    await contactpage.Invalid_Contact_Submission(stats.ContactEmptyScenario[0]);
    await expect(page.getByText("First name is required")).toBeVisible();
    await expect(page.getByText("Last name is required")).toBeVisible();
    
});