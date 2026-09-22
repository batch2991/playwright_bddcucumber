import { BasePage } from "./BasePage";

export class CartPage extends BasePage
{
    private readonly products:string="div.inventory_item_name"
    private readonly removebtn:string="(//button[.='Remove'])[1]"

    async getProductsInCart()
    {
        let products=await this.page.locator(this.products).all()
        let productnames:string[]=[]
        for(let i=0;i<products.length;i++)
        {
            let name=await products[i].textContent()
            productnames.push(String(name))
        }
        return productnames
    }
    async removeProductFromCart()
    {
        await this.page.locator(this.removebtn).click()
    }
    async calcualtetotal()
    {
        
    }
}