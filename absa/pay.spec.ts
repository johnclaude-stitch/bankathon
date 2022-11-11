import { test, expect, chromium, Page } from "@playwright/test";
import { login } from "../modules/login.module";

test.only("accounts", async ({ page }) => {
  await page.goto("https://ib.absa.co.za/absa-online/login.jsp");

  // login
  await login(page);

  // Click pay
  await page.waitForSelector('.greeting.greeting-gt-md');
  await page.locator('[aria-label="Transact Page"]').click();
 
  // keep browser open
  await new Promise(() => {}); // prevents your script from exiting! 
  console.log("hey");
});
