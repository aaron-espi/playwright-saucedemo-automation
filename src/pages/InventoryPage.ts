import { expect, Locator, Page } from '@playwright/test';
import { InventorySelectors } from '../constants/selectors/InventorySelectors';

export class InventoryPage {
  page: Page;
  readonly inventoryItem: Locator;
  readonly inventoryContainer: Locator;
  readonly title: Locator;
  readonly openSideMenuButton: Locator;

  readonly addToCartButtonString: string = 'Add to cart';

  constructor(page: Page) {
    this.page = page;
    this.inventoryItem = page.locator(InventorySelectors.inventoryItem);
    this.inventoryContainer = page.locator(InventorySelectors.inventoryContainer);
    this.title = page.locator(InventorySelectors.title);
    this.openSideMenuButton = page.getByRole(InventorySelectors.openSideMenuButton.role, {
      name: InventorySelectors.openSideMenuButton.name,
    });
  }

  async verifyHomePageLoaded() {
    await expect(this.inventoryContainer).toBeVisible();
    await expect(this.title).toBeVisible();
    await expect(this.openSideMenuButton).toBeVisible();
  }

  async verifyProductsDetailsOnListingPage() {
    await this.verifyEachProductDetails(InventorySelectors.itemName, true);
    await this.verifyEachProductDetails(InventorySelectors.itemPrice, true);
    await this.verifyEachProductDetails(InventorySelectors.itemDescription, true);
    await this.verifyEachProductDetails(InventorySelectors.itemImage);
    await this.verifyAddToCartButtons();
  }

  async verifyEachProductDetails(selector: string, isTextCheck: boolean = false) {
    const products = await this.page.locator(InventorySelectors.inventoryItem).all();

    for (const product of products) {
      const element = product.locator(selector);
      await expect(element).toBeVisible();
      if (isTextCheck) {
        await expect(element).not.toBeEmpty();
      }
    }
  }

  async verifyAddToCartButtons() {
    const products = await this.page.locator(InventorySelectors.inventoryItem).all();

    for (const product of products) {
      const itemAddToCartButton = product.getByRole(InventorySelectors.itemAddToCartButton.role, {
        name: InventorySelectors.itemAddToCartButton.name,
      });
      await expect(itemAddToCartButton).toBeVisible();
      await expect(itemAddToCartButton).toBeEnabled();
      await expect(itemAddToCartButton).toHaveText(this.addToCartButtonString);
    }
  }

  async getProductPrices() {
    const products = await this.page.locator(InventorySelectors.inventoryItem).all();

    return Promise.all(
      products.map(async (product) => {
        const priceText = await product.locator(InventorySelectors.itemPrice).innerText();
        return parseFloat(priceText.replace('$', ''));
      })
    );
  }

  async getProduct(index: number) {
    return this.page.locator(InventorySelectors.inventoryItem).nth(index);
  }

  async getProductDetails(product: Locator) {
    const itemName = await product.locator(InventorySelectors.itemName).textContent();
    const itemDescription = await product.locator(InventorySelectors.itemDescription).textContent();
    const itemPrice = await product.locator(InventorySelectors.itemPrice).textContent();
    return { itemName, itemDescription, itemPrice };
  }

  async clickOnProduct(product: Locator) {
    await product.locator(InventorySelectors.itemName).click();
  }

  async selectSortOption(option: string) {
    await this.page.locator(InventorySelectors.sortContainer).selectOption(option);
  }

  async verifyPricesSorted(order: 'asc' | 'desc') {
    const prices = await this.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => (order === 'asc' ? a - b : b - a));
    expect(prices).toEqual(sortedPrices);
  }

  async verifyProductsSortedByName(order: 'asc' | 'desc') {
    const products = await this.page.locator(InventorySelectors.inventoryItem).all();

    const productNames = await Promise.all(
      products.map(
        async (product) => (await product.locator(InventorySelectors.itemName).textContent())?.toLowerCase() || ''
      )
    );

    const sortedNames = [...productNames].sort((a, b) => (order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)));

    expect(productNames).toEqual(sortedNames);
  }

  async toggleSideMenu(action: 'open' | 'close') {
    const buttonName =
      action === 'open' ? InventorySelectors.openSideMenuButton.name : InventorySelectors.closeSideMenuButton.name;
    await this.page.getByRole('button', { name: buttonName }).click();
  }

  async getSideMenuElements() {
    const sideMenu = this.page.locator(InventorySelectors.sideMenu);
    const closeButton = this.page.getByRole(InventorySelectors.closeSideMenuButton.role, {
      name: InventorySelectors.closeSideMenuButton.name,
    });
    const openButton = this.page.getByRole(InventorySelectors.openSideMenuButton.role, {
      name: InventorySelectors.openSideMenuButton.name,
    });

    return { sideMenu, closeButton, openButton };
  }

  async verifySideMenuIsOpen() {
    const { sideMenu, closeButton } = await this.getSideMenuElements();

    await expect(sideMenu).toBeVisible();
    await expect(closeButton).toBeVisible();
  }

  async verifySideMenuIsClosed() {
    const { sideMenu, closeButton, openButton } = await this.getSideMenuElements();

    await expect(sideMenu).not.toBeVisible();
    await expect(closeButton).not.toBeVisible();
    await expect(openButton).toBeVisible();
  }
}
