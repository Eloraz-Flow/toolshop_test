class CartPage{
    constructor(page){
        this.page=page;
        this.Product_Selection=page.getByRole("heading", {name:"Slip Joint Pliers"});
        this.Product_Addition=page.getByRole("button", {name:"Add to cart"});
        this.Product_In_Cart=page.locator('[data-test="cart-quantity"]');
        this.Product_Quantity_Input=page.getByRole("spinbutton", {name:"Quantity for Slip Joint Pliers"});
        this.Cart_Product_Removal=page.locator(`//tr[td[contains(., 'Slip Joint Pliers')]]//td[5]//a`);
        this.Limited_Product=page.getByRole("heading", {name:"Thor Hammer"});
        this.Limited_Product_Increase=page.getByRole("button", {name:"Increase quantity"});
        this.Checkout_Btn=page.getByRole("button", {name:"Proceed to checkout"});
        this.Proceed_to_Checkout=page.locator('[data-test="proceed-2"]');
        this.Country_Input=page.getByRole("combobox", {name:"Country"});
        this.Postcode_Input=page.getByRole("textbox", {name:"Postal code"});
        this.Housenumber_Input=page.getByRole("textbox", {name:"House number"});
        this.Street_Input=page.getByRole("textbox",{name:"Street"});
        this.City_Input=page.getByRole("textbox",{name:"City"});
        this.State_Input=page.getByRole("textbox",{name:"State"});
        this.Payment_Input=page.getByRole("combobox", {name:"Payment Method"});
        this.Confirmation_Btn=page.getByRole("button", {name:"Confirm"});
        this.Confirm_Purchase=page.getByRole('button', { name: /Confirm/i })
    }

    async Successful_Product_Inclusion (){
        await this.Product_Selection.click();
        await this.Product_Addition.click();
    }
    async Product_Inclusion(){
         await this.Product_Selection.click();
    }
    async Add_To_Cart (){
        await this.Product_Addition.click();
    }
 
    async Navigate_to_Cart(){
        await this.Product_In_Cart.click();
    }

    async Successful_Product_Qunatity_Update (Product_Quantity){
        console.log("Current URL:", this.page.url());
        await this.Product_Quantity_Input.fill(Product_Quantity);
    }

    async Successful_Product_Removal(){
        await this.Cart_Product_Removal.click();
    }

    async Navigate_to_Limited_Product(){
        await this.Limited_Product.click();
    }

    async Valid_Limited_Stock(){
        await this.Limited_Product_Increase.click();
    }
    async Successful_Checkout_Bio({country, postcode, housenumber, street, city, state}){
        await this.Checkout_Btn.click();
        await this.Proceed_to_Checkout.click();
        await this.Country_Input.selectOption(country);
        await this.Postcode_Input.fill(postcode);
        await this.Housenumber_Input.fill(housenumber);
        await this.Street_Input.fill(street);
        await this.City_Input.fill(city);
        await this.State_Input.fill(state);
        await this.Checkout_Btn.click();
    }
    async successful_Checkout_Payment(valid_option){
        await this.Payment_Input.selectOption(valid_option);
        await this.Confirmation_Btn.click();
    }

    async Checkout_Conformation(){
        await this.Confirm_Purchase.click();
    }
}
export default CartPage;