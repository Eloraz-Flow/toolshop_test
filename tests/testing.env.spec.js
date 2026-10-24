import{test, expect} from "@playwright/test"


test("just testing", async({page})=>{
    console.log(process.env.SUT_url)
})


