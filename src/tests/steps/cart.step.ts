import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../../pages/customfixture';


const { Given, When, Then } = createBdd(test);

Given('user is on cart page', async ({ productPage }) => {
    await productPage.goToCart();
});

When('remove the product from cart', async ({ cartPage,addedProductNames}) => {
    addedProductNames = await cartPage.getProductsInCart()
    await cartPage.removeProductFromCart()
});

Then('the product should be removed from cart', async ({ cartPage,addedProductNames }) => {
    let names3 = await cartPage.getProductsInCart()
    expect(names3.length).toBe(addedProductNames.length - 1)
});