import { test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe("sauce demo login test",()=>{
  let loginpg:LoginPage;
  let inventorypg:InventoryPage;

  test.beforeEach(async({page})=>{
    loginpg=new LoginPage(page);
    inventorypg=new InventoryPage(page);
    await loginpg.goto();
  });

  test("login with valid credentails",async()=>{
    await loginpg.login("standard_user","secret_sauce");
    expect(await inventorypg.isLoggedIn()).toBeTruthy();
  });

  test("login with invalid credentials",async()=>{
    await loginpg.login("standard_user","wrong_pswd");
    await expect(loginpg.getLoginError()).toBeTruthy();
  });
});