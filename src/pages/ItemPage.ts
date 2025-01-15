import { expect, Locator, Page } from '@playwright/test';
import { ItemSelectors } from '../constants/selectors/ItemSelectors';

export class ItemPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getProductDetails(product: Locator) {
    const itemName = await product.locator(ItemSelectors.itemName).textContent();
    const itemDescription = await product.locator(ItemSelectors.itemDescription).textContent();
    const itemPrice = await product.locator(ItemSelectors.itemPrice).textContent();
    return { itemName, itemDescription, itemPrice };
  }

  async verifyProductPageIsOpened() {
    await expect(this.page.locator(ItemSelectors.itemDetailsContainer)).toBeVisible();
  }

  async verifyProductDetailsAreConsistent(product: Locator, beforeDetails) {
    const afterDetails = await this.getProductDetails(product);
    await expect(beforeDetails.itemName).toBe(afterDetails.itemName);
    await expect(beforeDetails.itemDescription).toBe(afterDetails.itemDescription);
    await expect(beforeDetails.itemPrice).toBe(afterDetails.itemPrice);
  }
}
