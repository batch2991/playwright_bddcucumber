import { Page, TestInfo } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const ENV={
   USER_ID:process.env.USER_ID!,
   PASSWORD:process.env.PASSWORD!,
   productsurl:process.env.inventory_page!
}
export function getEnvURL()
{
      let env=process.env.Environemnt!
      switch(env)
      {
        case "QA":
            return process.env.QA_URL!
            break
        case "STAGE":
            return process.env.STAGE_URL!
            break
        default:
            throw new Error("Invalid environment")
      }
}

export async function takescreenshot(page:Page,testInfo:TestInfo,stepname:string)
{
     let image1=await page.screenshot({fullPage:true})
       await testInfo.attach(stepname,{
          body:image1,
          contentType:"image/png"
       })
    
}