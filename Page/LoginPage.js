class LoginPage{
    constructor (page){
        this.page=page;
        this.Email_Input=page.getByRole("textbox", {name:"Email address *"});
        this.Password_Input=page.getByRole("textbox", {name:"Password *"});
        this.Login_Button=page.getByRole("button", {name:"Login"});
        this.Register_Account=page.getByRole("link",{name:"Register your account"});
    }

    async valid_login(username, password){
        await this.Email_Input.fill(username);
        await this.Password_Input.fill(password);
        await this.Login_Button.click();

    }
    async navigate_to_registration_Page(){
        await this.Register_Account.click();
    }

    async invalid_login(username, password){

        await this.Email_Input.fill(username);
        await this.Password_Input.fill(password);
        await this.Login_Button.click();

    }
}

export default LoginPage;