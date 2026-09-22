import { BasePage } from "./BasePage"

export class LoginPage extends BasePage 
{    
    private readonly userinput:string="Username"
    private readonly passwordinput:string="Password"
    private readonly loginbtn:string="Login"
    private readonly errormsg:string="h3[data-test='error']"
   
    async login(username:string,password:string)
    {       
       await this.page.getByPlaceholder(this.userinput).fill(username)
       await this.page.getByPlaceholder(this.passwordinput).fill(password)
       await this.page.getByText(this.loginbtn).click()          
    }
    async getErrorMessage()
    {
        return this.page.locator(this.errormsg).textContent()
    }
    async rememberpwd()
    {
        
    }
   
}