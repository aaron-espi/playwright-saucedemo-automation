import { expect, Page } from '@playwright/test';
import { CartLocators } from '../constants/locators/CartLocators';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyCartPageLoaded() {
    await expect(this.page.locator(CartLocators.title)).toBeVisible();
    await expect(this.page.locator(CartLocators.checkoutButton)).toBeVisible();
    await expect(this.page.locator(CartLocators.cartQuantity)).toBeVisible();
    await expect(this.page.locator(CartLocators.continueShoppingButton)).toBeVisible();
  }

  async verifyCartIsEmpty() {
    const items = this.page.locator(CartLocators.inventoryItem);
    const count = await items.count();
    await expect(count).toBe(0);
  }

  async verifyCartIsNotEmpty() {
    const items = this.page.locator(CartLocators.inventoryItem);
    const count = await items.count();
    await expect(count).toBeGreaterThan(0);
  }

  async verifyCartContainsExpectedNumberOfProducts(itemCount: number) {
    const items = this.page.locator(CartLocators.inventoryItem);
    const count = await items.count();
    await expect(count).toBe(itemCount);
  }

  async getProductInCart() {
    const item = this.page.locator(CartLocators.inventoryItem);
    const itemName = await item.locator(CartLocators.itemName).textContent();
    const itemDescription = await item.locator(CartLocators.itemDescription).textContent();
    const itemPrice = await item.locator(CartLocators.itemPrice).textContent();
    return { itemName, itemDescription, itemPrice };
  }

  async verifyProductDetailsMatch(expectedDetails) {
    const itemDetailsInCart = await this.getProductInCart();
    await expect(itemDetailsInCart.itemName).toBe(expectedDetails.itemName);
    await expect(itemDetailsInCart.itemDescription).toBe(expectedDetails.itemDescription);
    await expect(itemDetailsInCart.itemPrice).toBe(expectedDetails.itemPrice);
  }

  async removeProductFromCart(itemIndex: number) {
    const items = this.page.locator(CartLocators.inventoryItem);
    const item = items.nth(itemIndex);
    await item.getByRole(CartLocators.removeItemButton.role, { name: CartLocators.removeItemButton.name }).click();
  }

  async goBackToInventory() {
    await this.page.locator(CartLocators.continueShoppingButton).click();
  }

  async clickOnCheckout() {
    await this.page.locator(CartLocators.checkoutButton).click();
  }
}
