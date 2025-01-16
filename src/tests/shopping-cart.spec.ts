import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('standard_user', 'secret_sauce');
});

test('should navigate to shopping cart page after clicking shopping cart button in header', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const shoppingCartPage = new ShoppingCartPage(page);
  await inventoryPage.clickOnShoppingCart();
  await shoppingCartPage.verifyShoppingCartPageLoaded();
});
