import { test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { ItemPage } from '../pages/ItemPage';
import { LoginPage } from '../pages/LoginPage';
import { credentials } from '../config/variables';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let itemPage: ItemPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  itemPage = new ItemPage(page);

  await loginPage.login(credentials.validUsername, credentials.validPassword);
});

test('should display product price, title, description, image and add-to-cart button on the product listing page', async () => {
  await inventoryPage.verifyProductsDetailsOnListingPage();
});

test('should navigate to the correct product page and display matching product details when a product is clicked', async () => {
  const product = await inventoryPage.getProduct(0);
  const beforeDetails = await inventoryPage.getProductDetails(product);
  await inventoryPage.clickOnProduct(product);
  await itemPage.verifyProductPageIsOpened();
  await itemPage.verifyProductDetailsAreConsistent(product, beforeDetails);
});
