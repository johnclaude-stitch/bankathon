import { test, expect, chromium, Page } from "@playwright/test";
import { login } from "../modules/login.module";

test.only("accounts", async ({ page }) => {
  await page.goto("https://ib.absa.co.za/absa-online/login.jsp");

  // login
  await login(page);

  await page.waitForLoadState("domcontentloaded");

  // Try and get accounts
  await page.waitForSelector('tile');
  const arrayOfAccountTiles = await page.locator("tile").locator('tile__data');

  console.log("hey")
});
