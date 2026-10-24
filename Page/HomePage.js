class HomePage{
    constructor (page){
        this.page=page;
        this.Signin_Link=page.getByRole("link", {name:"Sign in"});
        this.Home_link=page.getByRole("link", {name:"Home"});
        this.Hand_Tools=page.getByRole("checkbox", {name:"Hand Tools"});
    }

    async Launch_Application(app_url){
        await this.page.goto(app_url);
    }

    async Navigate_to_Signin_Page(){
        await this.Signin_Link.click();
    }

    async Navigate_to_HomePage(){
        await this.Home_link.click();
    }

    async Navigate_to_HandTools(){
        await this.Hand_Tools.click();
    }
}


export default HomePage;