import { test, expect, chromium, Page } from "@playwright/test";
import { getAccounts } from "../modules/getAccounts.module";
import { login } from "../modules/login.module";

test.only("accounts", async ({ page }) => {
  await page.goto("https://ib.absa.co.za/absa-online/login.jsp");

  // login
  await login(page);

  await page.waitForLoadState("domcontentloaded");

  // Try and get accounts
  const accounts = await getAccounts(page);

  expect(accounts).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        accountNo: expect.any(String),
        userType: expect.any(String),
        ProductType: expect.any(String),
        accountType: expect.any(String),
        lastRefreshed: expect.any(String),
        balance: expect.any(String),
        available: expect.any(String),
        uncleared: expect.any(String),
        displayBalance: expect.any(String),
        displayAvailable: expect.any(String),
        displayUncleared: expect.any(String),
      }),
    ])
  );
});
