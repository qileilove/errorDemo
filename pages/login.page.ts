import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class loginPage extends BasePage {
   
    readonly searchInput : Locator;
    readonly searchButton : Locator;
    constructor(page:Page) {
        super(page);
        this.searchInput = page.locator('');
        this.searchInput = page.locator('');
    }

    async jh_login(username: string , password: string ){
        await this.searchInput.fill(username);
        await this.searchButton.click();
    }

}