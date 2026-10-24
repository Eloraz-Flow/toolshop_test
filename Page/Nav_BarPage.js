class Nav_BarPage{
    constructor (page){
        this.page=page
        this.User_Menu=page.locator('[data-test="nav-menu"]');
        this.Logout_Button=page.getByText("Sign out");
        this.My_Favorite=page.getByRole("link", {name:"My favorites"});
        this.Contact=page.getByRole("link", {name:"Contact"});
    }

    async Logout_User(){
        await this.User_Menu.click();
        await this.Logout_Button.click();
    }

    async Favorite_Product(){
        await this.User_Menu.click();
        await this.My_Favorite.click();
    }

    async Contact_Naav(){
        await this.Contact.click();
    }


}

export default Nav_BarPage;