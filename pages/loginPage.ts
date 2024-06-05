import { type Locator, type Page, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly elements : {
        username : Locator,
        password : Locator,
        loginBtn : Locator,
        loginError : Locator
    };

    constructor(page: Page) {
        this.page = page;
        this.elements = {
            username : page.locator('[data-test="username"]'),
            password : page.locator ('[data-test="password"]'),
            loginBtn : page.locator('[data-test="login-button"]'),
            loginError: page.locator('[data-test="error"]')
        }
    }

    async goToLoginPage() {
        await this.page.goto("/")
    }

    async verificarLoginPageElementos() {
        await expect(this.elements.username).toBeVisible();
        await expect(this.elements.password).toBeVisible();
        await expect(this.elements.loginBtn).toBeVisible();
    }

    async login(username: any, password: any) {
        if (username) {
            await this.elements.username.clear();
            await this.elements.username.fill(username);
        }
        if (password) {
            await this.elements.password.clear();
            await this.elements.password.fill(password);
        }
        await this.elements.loginBtn.click();
    }
    async errorLoginMessage (elements: Locator, message: string  ) {
        await expect(elements).toBeVisible();
        await expect(elements).toHaveText(message);
    }

}