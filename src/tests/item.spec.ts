import { test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { ItemPage } from '../pages/ItemPage';
import { credentials } from '../config/variables';
import { LoginPage } from '../pages/LoginPage';


let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let itemPage: ItemPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  itemPage = new ItemPage(page);

  await loginPage.login(credentials.validUsername, credentials.validPassword);
  const product = await inventoryPage.getProduct(0);
  await inventoryPage.clickOnProduct(product);
});

test('should display product price, title, description, image and add-to-cart button on the item page', async () => {
  await itemPage.verifyProductDetailsOnItemPage();
});

test('should navigate back to inventory when clicking the back to products button', async () => {
  await itemPage.goBackToInventory();
  await inventoryPage.verifyHomePageLoaded();
});
