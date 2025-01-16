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

  async getProductInCart() {
    const product = this.page.locator(CartLocators.inventoryItem);
    const itemName = await product.locator(CartLocators.itemName).textContent();
    const itemDescription = await product.locator(CartLocators.itemDescription).textContent();
    const itemPrice = await product.locator(CartLocators.itemPrice).textContent();
    return { itemName, itemDescription, itemPrice };
  }

  async verifyProductDetailsInCartAreConsistent(expectedDetails) {
    const productDetailsInCart = await this.getProductInCart();
    await expect(productDetailsInCart.itemName).toBe(expectedDetails.itemName);
    await expect(productDetailsInCart.itemDescription).toBe(expectedDetails.itemDescription);
    await expect(productDetailsInCart.itemPrice).toBe(expectedDetails.itemPrice);
  }
}
