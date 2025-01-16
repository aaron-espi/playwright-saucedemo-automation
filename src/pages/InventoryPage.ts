import { expect, Locator, Page } from '@playwright/test';
import { InventoryLocators } from '../constants/locators/InventoryLocators';
import { SortOrder } from '../constants/enum/SortOrder';
import { SortCriteria } from '../constants/enum/SortCriteria';
import { SideMenuAction } from '../constants/enum/SideMenuAction';

export class InventoryPage {
  page: Page;

  readonly addToCartButtonString: string = 'Add to cart';

  constructor(page: Page) {
    this.page = page;
  }

  async verifyHomePageLoaded() {
    await expect(this.page.locator(InventoryLocators.inventoryContainer)).toBeVisible();
    await expect(this.page.locator(InventoryLocators.title)).toBeVisible();
    await expect(
      this.page.getByRole(InventoryLocators.openSideMenuButton.role, {
        name: InventoryLocators.openSideMenuButton.name,
      })
    ).toBeVisible();
  }

  async verifyProductsDetailsOnListingPage() {
    await this.verifyEachProductDetails(InventoryLocators.itemName, true);
    await this.verifyEachProductDetails(InventoryLocators.itemPrice, true);
    await this.verifyEachProductDetails(InventoryLocators.itemDescription, true);
    await this.verifyEachProductDetails(InventoryLocators.itemImage);
    await this.verifyAddToCartButtons();
  }

  async verifyEachProductDetails(selector: string, isTextCheck: boolean = false) {
    const items = await this.page.locator(InventoryLocators.inventoryItem).all();

    for (const item of items) {
      const element = item.locator(selector);
      await expect(element).toBeVisible();
      if (isTextCheck) {
        await expect(element).not.toBeEmpty();
      }
    }
  }

  async verifyAddToCartButtons() {
    const items = await this.page.locator(InventoryLocators.inventoryItem).all();

    for (const item of items) {
      const itemAddToCartButton = item.getByRole(InventoryLocators.itemAddToCartButton.role, {
        name: InventoryLocators.itemAddToCartButton.name,
      });
      await expect(itemAddToCartButton).toBeVisible();
      await expect(itemAddToCartButton).toBeEnabled();
      await expect(itemAddToCartButton).toHaveText(this.addToCartButtonString);
    }
  }

  async getProductPrices() {
    const items = await this.page.locator(InventoryLocators.inventoryItem).all();

    return Promise.all(
      items.map(async (item) => {
        const priceText = await item.locator(InventoryLocators.itemPrice).innerText();
        return parseFloat(priceText.replace('$', ''));
      })
    );
  }

  async getProduct(index: number) {
    return this.page.locator(InventoryLocators.inventoryItem).nth(index);
  }

  async getProductDetails(item: Locator) {
    const itemName = await item.locator(InventoryLocators.itemName).textContent();
    const itemDescription = await item.locator(InventoryLocators.itemDescription).textContent();
    const itemPrice = await item.locator(InventoryLocators.itemPrice).textContent();
    return { itemName, itemDescription, itemPrice };
  }

  async clickOnProduct(item: Locator) {
    await item.locator(InventoryLocators.itemName).click();
  }

  async selectSortOption(criteria: SortCriteria) {
    await this.page.locator(InventoryLocators.sortContainer).selectOption(criteria);
  }

  async verifyPricesSorted(order: SortOrder) {
    const prices = await this.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => (order === SortOrder.Ascending ? a - b : b - a));
    expect(prices).toEqual(sortedPrices);
  }

  async verifyProductsSortedByName(order: SortOrder) {
    const items = await this.page.locator(InventoryLocators.inventoryItem).all();

    const itemNames = await Promise.all(
      items.map(
        async (item) => (await item.locator(InventoryLocators.itemName).textContent())?.toLowerCase() || ''
      )
    );

    const sortedNames = [...itemNames].sort((a, b) =>
      order === SortOrder.Ascending ? a.localeCompare(b) : b.localeCompare(a)
    );

    expect(itemNames).toEqual(sortedNames);
  }

  async toggleSideMenu(action: SideMenuAction) {
    const buttonName =
      action === SideMenuAction.Open
        ? InventoryLocators.openSideMenuButton.name
        : InventoryLocators.closeSideMenuButton.name;
    await this.page.getByRole('button', { name: buttonName }).click();
  }

  async getSideMenuElements() {
    const sideMenu = this.page.locator(InventoryLocators.sideMenu);
    const closeButton = this.page.getByRole(InventoryLocators.closeSideMenuButton.role, {
      name: InventoryLocators.closeSideMenuButton.name,
    });
    const openButton = this.page.getByRole(InventoryLocators.openSideMenuButton.role, {
      name: InventoryLocators.openSideMenuButton.name,
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

  async clickOnLogout() {
    await this.page
      .getByRole(InventoryLocators.logoutButton.role, { name: InventoryLocators.logoutButton.name })
      .click();
  }

  async addProductToCart(index: number) {
    const item = await this.getProduct(index);
    await item
      .getByRole(InventoryLocators.itemAddToCartButton.role, { name: InventoryLocators.itemAddToCartButton.name })
      .click();
  }

  async clickOnAbout() {
    await this.page.getByRole(InventoryLocators.aboutButton.role, { name: InventoryLocators.aboutButton.name }).click();
  }

  async clickOnCart() {
    await this.page.locator(InventoryLocators.cartButton).click();
  }
}
