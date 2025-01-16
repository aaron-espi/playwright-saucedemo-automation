import { expect, Page } from '@playwright/test';
import { CartLocators } from '../constants/locators/CartLocators';
export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyShoppingCartPageLoaded() {
    await expect(this.page.locator(CartLocators.title)).toBeVisible();
    await expect(this.page.locator(CartLocators.checkoutButton)).toBeVisible();
    await expect(this.page.locator(CartLocators.cartQuantity)).toBeVisible();
    await expect(this.page.locator(CartLocators.continueShoppingButton)).toBeVisible();
  }

  async verifyShoppingCartIsEmpty() {
    const items = this.page.locator(CartLocators.inventoryItem);
    const count = await items.count();
    await expect(count).toBe(0);
  }
}
