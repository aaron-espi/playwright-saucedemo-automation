import { expect, Page } from '@playwright/test';
import { CheckoutOverviewLocators } from '../constants/locators/CheckoutOverviewLocators';

export class CheckoutOverviewPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnFinish() {
    await this.page.locator(CheckoutOverviewLocators.finishButton).click();
  }

  async getDisplayedInformation() {
    const item = this.page.locator(CheckoutOverviewLocators.inventoryItem);
    const itemName = await item.locator(CheckoutOverviewLocators.itemName).textContent();
    const itemDescription = await item.locator(CheckoutOverviewLocators.itemDescription).textContent();
    const itemPrice = await item.locator(CheckoutOverviewLocators.itemPrice).textContent();
    return { itemName, itemDescription, itemPrice };
  }

  async verifyProductDetailsAndPricesMatch(expectedDetails) {
    const itemDetailsInCart = await this.getDisplayedInformation();
    await expect(itemDetailsInCart.itemName).toBe(expectedDetails.itemName);
    await expect(itemDetailsInCart.itemDescription).toBe(expectedDetails.itemDescription);
    await expect(itemDetailsInCart.itemPrice).toBe(expectedDetails.itemPrice);
  }
}
