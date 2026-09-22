import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'src/tests/features/*.feature',
  steps: [
    'src/tests/steps/*.step.ts',
    'pages/customfixture.ts',
  ],  
  tags:'not @skip'
});

export default defineConfig({
  testDir,
  globalSetup:"./globalsetup.ts", 
  fullyParallel: true,  
  forbidOnly: !!process.env.CI, 
  retries: process.env.CI ? 2 : 0,  
  workers: process.env.CI ? 1 : undefined,  
  reporter: [['html'],['allure-playwright']],  
  use: {   
    trace: 'on',  
    headless:false,
    video:"on",
    screenshot:"on"
  },
  projects: [    
    {
      name: 'login functionality testing on chrome',
      testMatch: /login\.feature/,
      use: {
        ...devices['Desktop Chrome'],       
        storageState: undefined,
      },
    },

    {
      name: 'Products functionality testing on chrome',
      testMatch: /products\.feature/,
      use: {
        ...devices['Desktop Chrome'],       
        storageState: './loginauth.json',
      },
    },
    // {
    //   name: 'login functionality testing on iphone',
    //   testMatch: /login\.feature/,
    //   use: {
    //     ...devices['iPad Mini'],       
    //     storageState: undefined,
    //   },
    // },
  ]    
});
