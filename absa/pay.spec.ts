import { test } from "@playwright/test";
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
  await page.waitForSelector("#timerCanvas", {
    state: "visible",
  });

  var mfaFailed = page
    .waitForSelector(".ap-n2fa-errorMessageContainer")
    .then(() => "failed");

  var mfaSucceded = page
    .waitForSelector(".ap-addBeneficiary-form")
    .then(() => "success");

  const result = await Promise.race([mfaFailed, mfaSucceded]);

  console.log(result);

  // if the following element is visible, we failed MFA, resend
  if (result === "failed") {
    // MFA failed, try and resend it.
    console.log("MFA Failed.... Retrying");
    await page.locator('[aria-label="Resend. "]').click();
  }

  console.log("MFA Succeeded");

  //Benny could be absa or at another institution
  const benny = {
    name: "Pivendren Naik",
    accountNumber: "4082314247", // Pivendren's acct
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
  await page.locator('role=button[name="Next."]').click();

  // Click Add
  await page.waitForSelector(".ap-notifications-confirm");
  await page.locator('[aria-label="Add. "]').click();

  // Wait for success
  await page.waitForSelector(".ui-message-success");

  await new Promise(() => {}); // prevents your script from exiting!
  console.log("hey");
});
