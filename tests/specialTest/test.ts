

const { test, expect } = require('@playwright/test');
const http = require('http');

// Define a fixture that creates a new server
// const serverFixture = test.extend({
//   server: async ({}, use) => {
//     const server = http.createServer((req, res) => {
//       res.writeHead(200, { 'Content-Type': 'text/plain' });
//       res.end('Hello World\n');
//     });
//     await new Promise((resolve) => server.listen(0, resolve));
//     await use(`http://localhost:${server.address().port}`);
//     await new Promise((resolve) => server.close(resolve));
//   },
// });

// // Define a test that uses the server fixture
// serverFixture('example test', async ({ server }) => {
//   // Fetch the URL provided by the fixture and assert that the response is what we expect
//   const response = await fetch(server);
//   const text = await response.text();
//   expect(text).toBe('Hello World\n');
// });
const loginFixture = test.extend({
    page: async ({ browser }, use) => {
      const page = await browser.newPage();
      await page.goto("http://www.baidu.com");
      await use(page);
    },
  });
  
  // Define a test that uses the login fixture
  loginFixture(' admin can create license', async ({ page }) => {
    // Navigate to a URL that requires authentication and assert that the title of the page is correct

    await page.waitForLoadState('load');
    await page.waitForTimeout(3000);
    await page.title();

  });



export async function checkError(){
   return 'test'
}

