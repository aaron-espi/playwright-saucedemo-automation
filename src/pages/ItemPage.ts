import { expect, Locator, Page } from '@playwright/test';
import { ItemLocators } from '../constants/locators/ItemLocators';

export class ItemPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getProductDetails(product: Locator) {
    const itemName = await product.locator(ItemLocators.itemName).textContent();
    const itemDescription = await product.locator(ItemLocators.itemDescription).textContent();
    const itemPrice = await product.locator(ItemLocators.itemPrice).textContent();
    return { itemName, itemDescription, itemPrice };
  }

  async verifyProductPageIsOpened() {
    await expect(this.page.locator(ItemLocators.itemDetailsContainer)).toBeVisible();
  }

  async verifyProductDetailsAreConsistent(product: Locator, beforeDetails) {
    const afterDetails = await this.getProductDetails(product);
    await expect(beforeDetails.itemName).toBe(afterDetails.itemName);
    await expect(beforeDetails.itemDescription).toBe(afterDetails.itemDescription);
    await expect(beforeDetails.itemPrice).toBe(afterDetails.itemPrice);
  }
}
