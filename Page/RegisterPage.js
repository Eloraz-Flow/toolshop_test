class RegisterPage{
    constructor (page){
        this.page=page;
        this.Firstname_Input=page.getByRole("textbox",{name:"First name"});
        this.Lastname_Input=page.getByRole("textbox",{name:"Last name"});
        this.DOB_Input=page.getByRole("textbox",{name:"Date of Birth *"});
        this.Country_Input=page.getByRole("combobox",{name:"Country"});
        this.Postcode_Input=page.getByRole("textbox",{name:"Postal code"});
        this.Housenumber_Input=page.getByRole("textbox",{name:"House number"});
        this.Street_Input=page.getByRole("textbox",{name:"Street"});
        this.City_Input=page.getByRole("textbox",{name:"City"});
        this.State_Input=page.getByRole("textbox",{name:"State"});
        this.Phone_Input=page.getByRole("textbox",{name:"Phone"});
        this.Email_Input=page.getByRole("textbox",{name:"Email address"});
        this.Password_Input=page.getByRole("textbox",{name:"Password"});
        this.Register_Button=page.getByRole("button",{name:"Register"});

    }
    async Valid_Registration_Credentials({firstname, lastname, dob, country, postcode, housenumber, street, city, state, phone, email, password}){
        await this.Firstname_Input.fill(firstname);
        await this.Lastname_Input.fill(lastname);
        await this.DOB_Input.fill(dob);
        await this.Country_Input.selectOption(country);
        await this.Postcode_Input.fill(postcode);
        await this.Housenumber_Input.fill(housenumber);
        await this.Street_Input.fill(street);
        await this.City_Input.fill(city);
        await this.State_Input.fill(state);
        await this.Phone_Input.fill(phone);
        await this.Email_Input.fill(email);
        await this.Password_Input.fill(password);
        await this.Register_Button.click();

    }

    async Invalid_Registration_Credentials({Firstname, Lastname, DOB, Country, Postcode, Housenumber, Street, City, State, Phone, Email, Password}){
        await this.Firstname_Input.fill(Firstname);
        await this.Lastname_Input.fill(Lastname);
        await this.DOB_Input.fill(DOB);
        await this.Country_Input.selectOption(Country);
        await this.Postcode_Input.fill(Postcode);
        await this.Housenumber_Input.fill(Housenumber);
        await this.Street_Input.fill(Street);
        await this.City_Input.fill(City);
        await this.State_Input.fill(State);
        await this.Phone_Input.fill(Phone);
        await this.Email_Input.fill(Email);
        await this.Password_Input.fill(Password);
        await this.Register_Button.click();

    }
}

export default RegisterPage;