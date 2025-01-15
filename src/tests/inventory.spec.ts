import { test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { ItemPage } from '../pages/ItemPage';
import { LoginPage } from '../pages/LoginPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('standard_user', 'secret_sauce');
});

test('should display product price, title, description, image and add-to-cart button on the product listing page', async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.verifyProductsDetailsOnListingPage();
});

test('should navigate to the correct product page and display matching product details when a product is clicked', async ({
  page,
}) => {
  const itemPage = new ItemPage(page);
  const inventoryPage = new InventoryPage(page);

  const product = await inventoryPage.getProduct(0);
  const beforeDetails = await inventoryPage.getProductDetails(product);

  await inventoryPage.clickOnProduct(product);

  await itemPage.verifyProductPageIsOpened();
  await itemPage.verifyProductDetailsAreConsistent(product, beforeDetails);
});
