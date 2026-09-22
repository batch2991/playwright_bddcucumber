import { createBdd } from 'playwright-bdd';
import { test,expect } from '../../../pages/customfixture';
import { takescreenshot } from "../../../utils/config"
import { ENV } from "../../../utils/config"

const {Given, When, Then } = createBdd(test);

Given('user is on products page', async ({page, productPage }) => {
  await productPage.openUrl(ENV.productsurl);
  let status=await productPage.validateProductPage();
  expect(status).toBeTruthy()
  let product1=await page.getByAltText("Sauce Labs Backpack")
  expect(product1).toHaveScreenshot("product1screen.png")
});

Then('The number of products should be as expected',async ({ productPage }) => {
    let count=await productPage.getProductsCount()
   expect(count).toBe(6)

});
When('Sort products by price low to high',async ({page, productPage,$testInfo}) => {
    await productPage.sortProducts("lohi")
   await takescreenshot(page,$testInfo,"After sorting products")
});
Then('the products should be sorted by price',async ({ productPage }) => {
    let prices = await productPage.getPrices()
   const expectedPrices = [...prices].sort((a, b) => a - b)  
   expect(expectedPrices).toEqual(prices)
});
When('add a products to cart', async ({ productPage,addedProductNames,page,$testInfo}) => {
  const names = await productPage.addProductsToCart();
  addedProductNames.push(...names);
  await productPage.goToCart();
   await takescreenshot(page,$testInfo,"After Adding products to cart")
});
Then('the product should be added to cart',async ({cartPage, addedProductNames }) => {
    let names2 = await cartPage.getProductsInCart()
   console.log(addedProductNames)
   console.log(names2)
   expect(addedProductNames.sort()).toEqual(names2.sort())
});