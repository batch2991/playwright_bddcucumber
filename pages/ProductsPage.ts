import { BasePage } from "./BasePage"

export class ProductPage extends BasePage
{
    private readonly prodheading: string = "Products"
    private readonly menu: string = "Open Menu"
    private readonly logoutlink: string = "Logout"

    private readonly prodnames:string="div.inventory_item_name "
    private readonly sortlist: string = "select.product_sort_container"
    private readonly prices: string = "div.inventory_item_price"

    private readonly cartlink:string="a.shopping_cart_link"


    async validateProductPage() 
    {
        await this.page.waitForSelector("span:has-text('Products')", { timeout: 10000 })
        return this.page.getByText(this.prodheading).isVisible()
    }
    async logout() {
        await this.page.getByText(this.menu).click()
        await this.page.getByText(this.logoutlink).click()
    }
    async getProductsCount()
    {
        return await this.page.locator(this.prodnames).count()
    }
    async sortProducts(sortby: string) {
        await this.page.locator(this.sortlist).selectOption({ value: sortby })
        await this.page.waitForTimeout(3000)
    }
    async getPrices() {
        let pricelist: number[] = []
        let pr = await this.page.locator(this.prices).all()
        for (let i = 0; i < pr.length; i++) {
            let p = Number(String(await pr[i].textContent()).slice(1))
            pricelist.push(p)
        }
        return pricelist
    }
    async addProductsToCart() 
    {
        let prname:string[]=[]
        for (let i = 1; i <= 2; i++) 
        {
            let n=Math.floor(Math.random()*6+1)
            let pname=await this.page.locator("(//button[.='Add to cart'])["+n+"]/parent::div[1]/preceding-sibling::div/a/div").textContent()
            prname.push(String(pname))
            await this.page.locator(`(//button[.='Add to cart'])[${n}]`).click()
        }
        return prname
    }
    async goToCart()
    {
        await this.page.locator(this.cartlink).click()
    }

}
