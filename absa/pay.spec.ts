import { test, expect, chromium, Page } from "@playwright/test";
import { getAccounts } from "../modules/getAccounts.module";
import { login } from "../modules/login.module";

test.only("add benny", async ({ page }) => {
  await page.goto("https://ib.absa.co.za/absa-online/login.jsp");

  // login
  await login(page);

  // Click pay
  await page.waitForSelector("#ap-page-body");

  // Add benny
  await page.locator("#mTabNo2").click();
  await page.waitForSelector("#ap-page-body");

  await page
    .locator(".ap-bar-title", {
      hasText: "My beneficiaries - new and existing",
    })
    .click();

  // TODO: We have the ability to select which acount we add the benny to

  // Click add benny
  await page.locator(".ap-tabHead-addBeneficiary").click();

  // MFA
  await page.waitForSelector(".ap-n2fa-TVM-form.sureCheck2Form.ap-SVM-form", {
    timeout: 60000,
  });

  // TODO: handle MFA failure

  // Assume success
  await page.waitForSelector(".ap-addBeneficiary-form", {
    timeout: 60000,
  });

  // Benny could be absa or at another institution
  const benny = {
    name: "Pivendren Naik",
    accountNumber: "4082314247" // Pivendren's acct
  };

  const bennyNameFieldId = "#addBeneficiary-beneficiaryName";
  const bennyAcctNumberFieldId = "#addBeneficiary-accountNumber";
  const myReferenceFieldId = "#addBeneficiary-myReference";
  const bennyReferenceFieldId = "#addBeneficiary-beneficiaryReference";

  // No proof of payments for now
  await page.locator('select[name="notMyType"]').selectOption("N");
  await page.locator('select[name="notBenType"]').selectOption("N");

  // Fill in all the fields :)
  await page.locator(bennyNameFieldId).fill(benny.name);
  await page.locator(bennyAcctNumberFieldId).fill(benny.accountNumber);
  await page.locator(myReferenceFieldId).fill("bankathon");
  await page.locator(bennyReferenceFieldId).fill("stitch-bankathon");

  // Click and send it
  // aria-label="Next. "
  await page.locator('[aria-label="Next. "]').click();

  await new Promise(() => {}); // prevents your script from exiting!
  console.log("hey");
});
