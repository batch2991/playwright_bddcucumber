import { createBdd } from 'playwright-bdd';
import { test,expect } from '../../../pages/customfixture';
import { getEnvURL } from "../../../utils/config"
import { ENV } from "../../../utils/config"
import {AxeBuilder} from '@axe-core/playwright'

const { Given, When, Then } = createBdd(test);

Given('user is on login page', async ({page,loginPage }) => {
 await loginPage.openUrl(getEnvURL()) 
 await expect(page).toHaveScreenshot("loginscreen.png",{fullPage:true})
});
When(
  'enter valid userid and valid pwd and click login',
  async ({ loginPage }) => {
    await loginPage.login(ENV.USER_ID, ENV.PASSWORD);
  }
); 
Then('user should be redirected to products page', async ({page, productPage }) => {
  let status=await productPage.validateProductPage();
  let productpageresults=await new AxeBuilder({page}).analyze()
  expect(productpageresults.violations).toEqual([])

  expect(status).toBeTruthy()
});
When('enter invalid {string} or invalid {string} and click login',async ({ loginPage }, userid: string, pwd: string) => {
    await loginPage.login(userid, pwd);
  }
);
Then('error message should be {string}', async ({ loginPage },expectederror:string) => {
  let errormsg=await loginPage.getErrorMessage()
   expect(errormsg).toContain(expectederror)
});