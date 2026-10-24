class Product_CatalogPage{
    constructor (page){
        this.page=page;
        this.Category_Menu=page.getByRole("button", {name:"Categories"});
        this.Handy_Tools=page.getByRole("link", {name:"Hand Tools"});
        this.Search_Input=page.getByRole("textbox", {name:"Search"});
        this.Search_Button=page.getByRole("button", {name:"Search"});
        this.Price_Min_Input=page.getByRole("slider", {name:"ngx-slider", exact: true});
        this.Price_Max_Input=page.getByRole("slider", {name:"ngx-slider-max"});
        this.Product_Price = page.locator('[data-test="product-price"]');
        this.Product_Sorting=page.getByRole("combobox", {name:"sort"});
        this.Product_Detail=page.getByRole("heading", {name:"Thor Hammer"});
    }

    async Navigate_to_HandyTools (){
        await this.Category_Menu.click();
        await this.Handy_Tools.click();
    }

    async Valid_Product_Search (Search_Query){
        await this.Search_Input.fill(Search_Query);
        await this.Search_Button.click();
    }

    async Invalid_Product_Search (Search_Query){
        await this.Search_Input.fill(Search_Query);
        await this.Search_Button.click();
    }

   async Successful_Price_Filter(min, max) {
    await this.Price_Min_Input.focus();
    await this.Price_Min_Input.press("Home");

    let currentMin = 0;
    let safetyCounter = 0;
    while (currentMin < min && safetyCounter < 500) {
        await this.Price_Min_Input.press("ArrowRight");
        await this.page.waitForTimeout(50);
        currentMin = parseFloat(await this.Price_Min_Input.getAttribute("aria-valuenow"));
        console.log(`iteration ${safetyCounter}: currentMin = ${currentMin}`);
        safetyCounter++; 
    }

    console.log(`Final min: ${currentMin}, iterations used: ${safetyCounter}`);

    await this.Price_Max_Input.focus();
    await this.Price_Max_Input.press("End");

    let currentMax = parseFloat(await this.Price_Max_Input.getAttribute("aria-valuenow"));
    safetyCounter = 0;
    while (currentMax > max && safetyCounter < 500) {
        await this.Price_Max_Input.press("ArrowLeft");
        currentMax = parseFloat(await this.Price_Max_Input.getAttribute("aria-valuenow"));
        safetyCounter++;
    }

    await this.page.waitForTimeout(500);
}
    async getDisplayedPrices() {
        const priceElements = this.Product_Price;
        const count = await priceElements.count();
        const prices = [];
        for (let i = 0; i < count; i++) {
            const text = await priceElements.nth(i).innerText();
            const numericValue = parseFloat(text.replace(/[^0-9.]/g, ""));
            prices.push(numericValue);
        }
        return prices;
    }

    async Sucessful_Product_Sorting(Sort_Option){
        await this.Product_Sorting.selectOption(Sort_Option);
       
    }

    async Correct_Page_Details(){
        await this.Product_Detail.click();
    }

}
export default Product_CatalogPage;
