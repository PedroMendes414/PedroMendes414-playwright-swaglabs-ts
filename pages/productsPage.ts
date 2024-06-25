import { type Locator, type Page, expect } from '@playwright/test';

export class productsPage{
    readonly page: Page;
    readonly elements : {
        productsTitle: Locator

    }

    constructor(page: Page){
        this.page = page;
        this.elements = {
            productsTitle: page.locator('[data-test="title"]')
        }
    }

}