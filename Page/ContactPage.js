class ContactPage{
    constructor(page){
        this.page=page;
        this.Firstname=page.getByRole("textbox", {name:"First name"});
        this.Lastname=page.getByRole("textbox", {name:"Last name"});
        this.Email=page.getByRole("textbox", {name:"Email address"});
        this.Subject=page.getByRole("combobox", {name:"Subject"});
        this.Message=page.getByRole("textbox", {name:"Message"});
        this.Send=page.getByRole("button", {name:"Send"});

    }

    async Successful_Contact_Submission({firstname, lastname, emailaddress, subject, message}){
        await this.Firstname.fill(firstname);
        await this.Lastname.fill(lastname);
        await this.Email.fill(emailaddress);
        await this.Subject.selectOption(subject)
        await this.Message.fill(message);
        await this.Send.click();
    }

    async Invalid_Contact_Submission({firstname, lastname, emailaddress, subject, message}){
        await this.Firstname.fill(firstname);
        await this.Lastname.fill(lastname);
        await this.Email.fill(emailaddress);
        if (subject) {
            await this.Subject.selectOption(subject);
        }
        await this.Message.fill(message);
        await this.Send.click();
    }

    async Invalid_Minimum_Sunmission({firstname, lastname, emailaddress, subject, message}){
        await this.Firstname.fill(firstname);
        await this.Lastname.fill(lastname);
        await this.Email.fill(emailaddress);
        await this.Subject.selectOption(subject)
        await this.Message.fill(message);
        await this.Send.click();
    }
}
export default ContactPage;