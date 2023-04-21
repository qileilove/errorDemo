import { test, expect } from '@playwright/test';
import { storageState } from '../fixtures/myFixtures';
import { getCurrentDate } from '../utils/dataFormat';
import { chromium, Browser, Page } from '@playwright/test';
storageState.describe('subscription management test ', () => {
storageState.beforeEach(()=>{
  getCurrentDate();
});
storageState('has title', async ({ page,loginPageObject }) => {
  await loginPageObject.baseUrl();
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});


});
