import { type Locator, type Page, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly elements : {
        username : Locator;
        password : Locator;
        loginBtn : Locator;
    };

    constructor(page: Page) {
        this.page = page;
        this.elements = {
            username : page.locator('[data-test="username"]'),
            password : page.locator ('[data-test="password"]'),
            loginBtn : page.locator('[data-test="login-button"]')
        }
    }
}