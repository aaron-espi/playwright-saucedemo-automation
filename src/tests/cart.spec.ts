import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ItemPage } from '../pages/ItemPage';
import { CartPage } from '../pages/CartPage';
import { CartButtonState } from '../constants/enum/CartButtonState';
import { config } from '../../playwright.config';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let itemPage: ItemPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page);
  itemPage = new ItemPage(page);

  await loginPage.login(config.validUsername, config.validPassword);
});

test('should navigate to shopping cart page after clicking shopping cart button in header', async () => {
  await inventoryPage.clickOnCart();
  await cartPage.verifyCartPageLoaded();
});

test('should toggle add/remove button text on inventory page when adding/removing item from cart', async () => {
  await inventoryPage.addProductToCart(0);
  await inventoryPage.verifyAddToCartButtonText(0, CartButtonState.Remove);
  await inventoryPage.removeProductFromCart(0);
  await inventoryPage.verifyAddToCartButtonText(0, CartButtonState.AddToCart);
});

test('should toggle add/remove button text on item detail page when adding/removing item from cart', async () => {
  const product = await inventoryPage.getProduct(0);
  await inventoryPage.clickOnProduct(product);
  await itemPage.addProductToCart();
  await itemPage.verifyAddToCartButtonText(CartButtonState.Remove);
  await itemPage.removeProductFromCart();
  await itemPage.verifyAddToCartButtonText(CartButtonState.AddToCart);
});

test('should display an empty shopping cart if no products have been added previously', async () => {
  await inventoryPage.clickOnCart();
  await cartPage.verifyCartIsEmpty();
});

test('should display the product in the shopping cart after adding it', async () => {
  const product = await inventoryPage.getProduct(0);
  const detailsBefore = await inventoryPage.getProductDetails(product);
  await inventoryPage.addProductToCart(0);
  await inventoryPage.clickOnCart();
  await cartPage.verifyCartContainsExpectedNumberOfProducts(1);
  await cartPage.verifyProductDetailsMatch(detailsBefore);
});

test('should empty the shopping cart after removing the product', async () => {
  await inventoryPage.addProductToCart(0);
  await inventoryPage.clickOnCart();
  await cartPage.removeProductFromCart(0);
  await cartPage.verifyCartIsEmpty();
});

test('should persist product in shopping cart after navigation', async () => {
  await inventoryPage.addProductToCart(0);
  await inventoryPage.clickOnCart();
  await cartPage.goBackToInventory();
  await inventoryPage.clickOnCart();
  await cartPage.verifyCartIsNotEmpty();
});

test('should display multiple products in the shopping cart after adding them', async () => {
  await inventoryPage.addProductToCart(0);
  await inventoryPage.addProductToCart(1);
  await inventoryPage.clickOnCart();
  await cartPage.verifyCartContainsExpectedNumberOfProducts(2);
});

test('should remove the selected product without affecting others in the cart', async () => {
  const product = await inventoryPage.getProduct(1);
  const detailsBefore = await inventoryPage.getProductDetails(product);
  await inventoryPage.addProductToCart(0);
  await inventoryPage.addProductToCart(1);
  await inventoryPage.clickOnCart();
  await cartPage.removeProductFromCart(0);
  await cartPage.verifyCartContainsExpectedNumberOfProducts(1);
  await cartPage.verifyProductDetailsMatch(detailsBefore);
});
