import { expect, Page } from '@playwright/test';
import { ShoppingCartLocators } from '../constants/locators/ShoppingCartLocators';
export class ShoppingCartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyShoppingCartPageLoaded() {
    await expect(this.page.locator(ShoppingCartLocators.title)).toBeVisible();
    await expect(this.page.locator(ShoppingCartLocators.checkoutButton)).toBeVisible();
    await expect(this.page.locator(ShoppingCartLocators.cartQuantity)).toBeVisible();
    await expect(this.page.locator(ShoppingCartLocators.continueShoppingButton)).toBeVisible();
  }

  async verifyShoppingCartIsEmpty() {
    const items = this.page.locator('[data-test="inventory-item"]');
    const count = await items.count();
    await expect(count).toBe(0);
  }
}
