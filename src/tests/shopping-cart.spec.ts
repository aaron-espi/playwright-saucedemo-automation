import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('standard_user', 'secret_sauce');
});

test('should navigate to shopping cart page after clicking shopping cart button in header', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const shoppingCartPage = new CartPage(page);
  await inventoryPage.clickOnShoppingCart();
  await shoppingCartPage.verifyShoppingCartPageLoaded();
});

test('should display an empty shopping cart if no products have been added previously', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const shoppingCartPage = new CartPage(page);
  await inventoryPage.clickOnShoppingCart();
  await shoppingCartPage.verifyShoppingCartIsEmpty();
});

test('should display the item in the shopping cart after adding it', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const shoppingCartPage = new CartPage(page);
  const product = await inventoryPage.getProduct(0);
  const detailsBefore = await inventoryPage.getProductDetails(product);
  await inventoryPage.addProductToCart(0);
  await inventoryPage.clickOnShoppingCart();
  await shoppingCartPage.verifyProductDetailsInCartAreConsistent(detailsBefore);
});

// comprobar que al añadir y quitarlo no se muestra

// comprobar que al añadir, salir, volver a entrar, se queda el item
