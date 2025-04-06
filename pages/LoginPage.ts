import { Page } from "@playwright/test";

export class LoginPage{
  private page:Page;
  constructor(page:Page){
    this.page=page;
  }
  async goto(){
    await this.page.goto('/');
  }
  async login(un:string,pswd:string){
    await this.page.locator("#user-name").fill(un);
    await this.page.locator("#password").fill(pswd);
    await this.page.locator("#login-button").click();
  }
  async getLoginError(){
    return this.page.locator('[data-test="error"]'); // Brackets needed

  }
}