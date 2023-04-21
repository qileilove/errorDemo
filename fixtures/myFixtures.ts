import { test as base } from '@playwright/test';

import { loginPage } from '../pages/login.page';

// Declare the types of your fixtures.
type TestFixtures = {
  loginPageObject: loginPage;
  
};

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const storageState = base.extend<TestFixtures>({
    loginPageObject:  async ({ page}, use) => {

    const login = new loginPage(page);
    await use(login);

  },
  // projectAnalysisPage:  async ({ browser,page}, use) => {
  //   const projectAnalysis = await new ProjectAnalysisPage(page).groupOwnerLogin(browser);

  //   await use(projectAnalysis);

  // },
 

});
export { expect } from '@playwright/test';
