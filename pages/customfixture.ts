import {test as t} from "playwright-bdd"
import { LoginPage } from "./LoginPage"
import { ProductPage } from "./ProductsPage"
import { CartPage } from "./CartPage"

type MyFixtures={
  loginPage:LoginPage 
  productPage:ProductPage
  cartPage:CartPage
  addedProductNames: string[];
}

export const test=t.extend<MyFixtures>({
  loginPage: async ({page},use)=>{
       let loginobj=new LoginPage(page)             
       await use(loginobj)
       console.log("After the fixture")
  },
  productPage: async({page},use)=>{
    let prodobj=new ProductPage(page)   
    await use(prodobj)
  },
  cartPage:async({page},use)=>{
    let cartobj=new CartPage(page)
    await use(cartobj)
  },
  addedProductNames: async ({}, use) => {
       await use([]);
},

})

export {expect} from "@playwright/test"