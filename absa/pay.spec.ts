import { test, expect, chromium, Page } from "@playwright/test";
import { getAccounts } from "../modules/getAccounts.module";
import { login } from "../modules/login.module";

test.only("accounts", async ({ page }) => {
  await page.goto("https://ib.absa.co.za/absa-online/login.jsp");

  // login
  await login(page);

  // Click pay
  await page.waitForSelector(".greeting.greeting-gt-md");
  // await page.locator('role=link[name="Transact Page"]').click();
  await page.locator('[aria-label="Pay using this account"]').click();

  const onceOff = true;
  if (onceOff) {
    page.on("response", async (res) => {
      console.log({ url: res.url(), headers: res.headers() });
    });

    page.on("request", (req) => {
      console.log({
        url: req.url(),
        headers: req.headers(),
        body: req.postData(),
      });
    });
  } else {
    // Add a beneficiary
  }

  await new Promise(() => {}); // prevents your script from exiting!
  console.log("hey");
});
