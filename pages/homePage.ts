import { type Locator, type Page, expect } from '@playwright/test';

export class homePage{
    readonly page: Page;
    readonly elements : {
        

    }
    async goToHomePage() {
        await this.page.goto("https://www.saucedemo.com/inventory.html")
    }
}