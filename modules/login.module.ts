import { Page } from "@playwright/test";

export async function login(page: Page) {
  // Inputs fields
  const usernameId = "#j_username";
  const pinId = "#j_pin";
  const userNumberId = "#j_user_no";

  // Input values
  let accountNumber = "4082314247";
  let pin = "2712";
  let userNumber = "1";
  let userPassword = "bigboygpr250";

  // Insert username/acct number
  await page.waitForSelector(usernameId);
  await page.locator(usernameId).fill(accountNumber);

  await page.waitForSelector(pinId);
  await page.locator(pinId).fill(pin);

  await page.waitForSelector(userNumberId);
  await page.locator(userNumberId).fill(userNumber);

  await page.getByRole("button", { name: "Next" }).click();

  // // Enter password
  await page.waitForSelector(".pf");
  const arrayOfPasswords = await page.locator(".pf");
  const elementsCount = await arrayOfPasswords.count();

  for (let index = 0; index < elementsCount; index++) {
    const element = await arrayOfPasswords.nth(index);
    if (!(await element.isDisabled())) {
      await element.fill(userPassword[index]);
    }
  }

  // Full Service
  await page.locator('select[name="landingpage2"]').selectOption('accounts');
  // Express
  // await page.locator('select[name="landingpage2"]').selectOption('express');

  await page.getByRole("button", { name: "Logon" }).click();
  await page.waitForLoadState("domcontentloaded");
}
