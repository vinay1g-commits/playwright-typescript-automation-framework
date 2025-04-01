import { Page } from "@playwright/test";

export class InventoryPage{
  private page:Page;
  constructor(page:Page){
    this.page=page;
  }

  async isLoggedIn(){
    await this.page.locator(".inventory_list");
    return this.page.locator(".inventory_list").isVisible();
  }

  async logout(){
    await this.page.locator(`#react-burger-menu-btn`).click();
    await this.page.locator('#logout_sidebar_link').click();
  }
}