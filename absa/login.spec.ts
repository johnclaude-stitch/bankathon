import { test, expect, chromium, Page } from "@playwright/test";
import { login } from "../modules/login.module";

test("login", async ({ page }) => {
  await page.goto("https://ib.absa.co.za/absa-online/login.jsp");

  // login
  await login(page);

  await expect(page).toHaveURL('https://ib.absa.co.za/axob/cb/online-banking/dashBoard');
});


