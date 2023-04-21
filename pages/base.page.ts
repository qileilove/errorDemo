import { Page, Locator, expect } from '@playwright/test';
import config from '../playwright.config';

export abstract class BasePage {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }
     baseUrl (){
      return  config.use?.baseURL;
    }
    async isSelectorExists(selector: string) {
        return await this.page.$(selector).catch(() => null) !== null;
    }
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    async checkCurrentUrl(url){
      
     expect(this.page.url()).toContain(url)

    }
  async refresh(){
    return  this.page.reload();
  }

    async waitForText(element, text) {
        await expect(element).toHaveText(text, { timeout: 20000 })
    }


    async  navigateWithRetry(page ,url, maxRetries: number){
      let retries = 0;
      let response;
    
      while (retries <= maxRetries) {
    
        try {
          response = await this.page.goto(url);
          if (response?.status() !== 200) {
            console.error(`Failed to load ${url}. Status code: ${response?.status()}`);
            throw new Error(`Failed to load ${url}.`);
          }
    
          console.log(`${url} loaded successfully.`);
          return;
        } catch (error) {
          console.error(error);
          retries++;
          console.log(`Retrying. Attempt ${retries} of ${maxRetries}...`);
          await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
        }
      }
    
      console.error(`Exceeded max retries (${maxRetries}). Failed to load ${url}.`);
      await page?.close();
    }
    
    // Usage:


    async retryUntil(
        check: () => Promise<boolean>,
        {
          timeout = 10000,
          retries = 3,
          retryInterval = 1000,
          refreshPage = false
        }: {
          timeout?: number,
          retries?: number,
          retryInterval?: number,
          refreshPage?: boolean
        } = {}
      ) {
        let attempt = 0;
        const startTime = Date.now();
      
        while (attempt < retries) {
          try {
            const result = await check();
            if (result) {
              return result;
            }
          } catch (error) {
            console.error(error);
          }
      
          if (Date.now() - startTime > timeout) {
            throw new Error(`Operation timed out after ${timeout}ms`);
          }
      
          if (refreshPage) {
            await this.page.reload();
          }
      
          attempt++;
          await new Promise(resolve => setTimeout(resolve, retryInterval));
        }
      
        throw new Error(`Operation failed after ${retries} attempts`);
      }
}
