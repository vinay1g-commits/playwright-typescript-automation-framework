/*
Data driven testing involves executing same set of actions with multipole datasets.making tests scalable,maintainable,realistic by seperating test data from test logic.
*/
import {test,expect} from '@playwright/test';
import {LoginPage} from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import testData from '../../data/testData.json';


  test.describe("Data driven Login Tests",()=>{
    for (const data of testData){
      test(`Login test of ${data.username}:${data.password}`,async({page})=>{
        const loginPg=new LoginPage(page);
        const inventoryPg=new InventoryPage(page);
  
        await loginPg.goto();
        await loginPg.login(data.username,data.password);
  
        if(data.shouldLogin){
          await expect(inventoryPg.isLoggedIn()).toBeTruthy();
        }else{
          const errorLocator=await loginPg.getLoginError();
          expect (errorLocator).toBeVisible();
        }
      })
    }  
  })

