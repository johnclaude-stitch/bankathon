import { Page } from "@playwright/test";

export async function getAccounts(page: Page) {
  // Go to the accounts tab
  await page.getByRole("link", { name: "Accounts" }).click();

  await page
    .getByRole("button", { name: "Click to refresh balances." })
    .click();

  const [accountsResponse] = await Promise.all([
    page.waitForResponse(async (response) => {
      if (
        response.request().url() ===
          "https://ib.absa.co.za/absa-online/proxy" &&
        response.request().postData()?.includes("Retail")
      ) {
        return true;
      }
      return false;
    }),
  ]);

  // Parse accounts from the response
  const accountsString = (await accountsResponse.body()).toString()
  const accounts = JSON.parse(accountsString.slice(accountsString.indexOf('['), accountsString.indexOf(']') + 1));
  
  return accounts;
}
