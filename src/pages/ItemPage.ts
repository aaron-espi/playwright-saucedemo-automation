import { expect, Locator, Page } from '@playwright/test';
import { ItemLocators } from '../constants/locators/ItemLocators';

export class ItemPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getProductDetails(item: Locator) {
    const itemName = await item.locator(ItemLocators.itemName).textContent();
    const itemDescription = await item.locator(ItemLocators.itemDescription).textContent();
    const itemPrice = await item.locator(ItemLocators.itemPrice).textContent();
    return { itemName, itemDescription, itemPrice };
  }

  async verifyProductPageIsOpened() {
    await expect(this.page.locator(ItemLocators.itemDetailsContainer)).toBeVisible();
  }

  async verifyProductDetailsAreConsistent(item: Locator, beforeDetails) {
    const afterDetails = await this.getProductDetails(item);
    await expect(beforeDetails.itemName).toBe(afterDetails.itemName);
    await expect(beforeDetails.itemDescription).toBe(afterDetails.itemDescription);
    await expect(beforeDetails.itemPrice).toBe(afterDetails.itemPrice);
  }
}
