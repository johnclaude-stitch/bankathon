import { test, expect, chromium, Page } from "@playwright/test";


test("absa", async ({ page }) => {
  const insertInitialCredentials = async (page: Page) => {
    await page.locator(`#${usernameId}`).fill(accountNumber);
    await page.locator(`#${pinId}`).fill(pin);
    await page.locator(`#${userNumberId}`).fill(userNumber);
  };

  await page.goto("https://ib.absa.co.za/absa-online/login.jsp");

  // Inputs fields
  const usernameId = "j_username";
  const pinId = "j_pin";
  const userNumberId = "j_user_no";

  // Input values
  let accountNumber = "4082314247";
  let pin = "2712";
  let userNumber = "1";
  let userPassword = "bigboygpr250";

  // Insert username/acct number
  await insertInitialCredentials(page);
  await page.getByRole("button", { name: "Next" }).click();

  // // Enter password
  const arrayOfPasswords = await page.locator(".pf");
  const elementsCount = await arrayOfPasswords.count();
  console.log(elementsCount);

  // // for each pf field
  // // if disabled == false
  // // fill field with password[index]

  // const passwordLoop = async () => {
  //   for (let index = 0; index < elementsCount; index++) {
  //     const element = await arrayOfPasswords.nth(index);
  //     if (!(await element.isDisabled())) {
  //       await element.fill(userPassword[index]);
  //     }
  //   }
  // };

  // await passwordLoop();

  // await page.getByRole("button", { name: "Logon" }).click();
  await expect(page).toHaveURL(
    "https://ib.absa.co.za/absa-online/login.jsp"
  );
});
