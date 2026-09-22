import { chromium,request } from "@playwright/test";
import fs from 'fs'

async function authorization() {
    let browser = await chromium.launch()
    let context = await browser.newContext()
    let page = await context.newPage()

    await page.goto("https://www.saucedemo.com")
    await page.getByPlaceholder("Username").fill("standard_user")
    await page.getByPlaceholder("Password").fill("secret_sauce")
    await page.getByRole("button", { name: 'Login' }).click()
    await page.waitForURL("https://www.saucedemo.com/inventory.html")
    await context.storageState({path:"./loginauth.json"})
    await browser.close()
}
export default authorization


async function apiauthentication()
{
    let context= await request.newContext({
        baseURL:"...api url"
    })

    let resp=await context.post("/resource url",{
        headers:{

        }
    })

    let body=await resp.json()
    let token1=body.accetoken


    fs.writeFileSync("./apitoken.json",JSON.stringify({token:token1}))
}