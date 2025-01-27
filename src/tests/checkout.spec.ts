import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { credentials, buyerDetails } from '../config/variables';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutInfoPage: CheckoutInfoPage;
let checkoutOverviewPage: CheckoutOverviewPage;
let checkoutCompletePage: CheckoutCompletePage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page);
  checkoutInfoPage = new CheckoutInfoPage(page);
  checkoutOverviewPage = new CheckoutOverviewPage(page);
  checkoutCompletePage = new CheckoutCompletePage(page);

  await loginPage.login(credentials.validUsername, credentials.validPassword);
});

test('should display input fields for name, surname, and zip code', async () => {
  await inventoryPage.addProductToCart(0);
  await inventoryPage.clickOnCart();
  await cartPage.clickOnCheckout();
  await checkoutInfoPage.verifyInputsAreVisible();
});

test('should not continue with empty name', async () => {
  await inventoryPage.addProductToCart(0);
  await inventoryPage.clickOnCart();
  await cartPage.clickOnCheckout();
  await checkoutInfoPage.fillLastNameInput(buyerDetails.lastName);
  await checkoutInfoPage.fillZipInput(buyerDetails.zipCode);
  await checkoutInfoPage.clickOnContinue();
  await checkoutInfoPage.verifyCheckoutInfoPageLoaded();
  await checkoutInfoPage.verifyNameRequiredMessage();
});

test('should not continue with empty surname', async () => {
  await inventoryPage.addProductToCart(0);
  await inventoryPage.clickOnCart();
  await cartPage.clickOnCheckout();
  await checkoutInfoPage.fillNameInput(buyerDetails.firstName);
  await checkoutInfoPage.fillZipInput(buyerDetails.zipCode);
  await checkoutInfoPage.clickOnContinue();
  await checkoutInfoPage.verifyCheckoutInfoPageLoaded();
  await checkoutInfoPage.verifyLastnameRequiredMessage();
});

test('should not continue with empty zip', async () => {
  await inventoryPage.addProductToCart(0);
  await inventoryPage.clickOnCart();
  await cartPage.clickOnCheckout();
  await checkoutInfoPage.fillNameInput(buyerDetails.firstName);
  await checkoutInfoPage.fillLastNameInput(buyerDetails.lastName);
  await checkoutInfoPage.clickOnContinue();
  await checkoutInfoPage.verifyZipRequiredMessage();
});

test('should navigate back to the cart when clicking on cancel', async () => {
  await inventoryPage.addProductToCart(0);
  await inventoryPage.clickOnCart();
  await cartPage.clickOnCheckout();
  await checkoutInfoPage.goBackToCart();
  await cartPage.verifyCartPageLoaded();
});

test('should display correct data and price after clicking continue', async () => {
  await inventoryPage.addProductToCart(0);
  await inventoryPage.clickOnCart();
  const beforeDetails = await cartPage.getProductInCart();
  await cartPage.clickOnCheckout();
  await checkoutInfoPage.fillCheckoutInfo(buyerDetails.firstName, buyerDetails.lastName, buyerDetails.zipCode);
  await checkoutOverviewPage.verifyProductDetailsAndPricesMatch(beforeDetails);
});

test('should complete the purchase when clicking on finish and then go back home', async () => {
  await inventoryPage.addProductToCart(0);
  await inventoryPage.clickOnCart();
  await cartPage.clickOnCheckout();
  await checkoutInfoPage.fillCheckoutInfo(buyerDetails.firstName, buyerDetails.lastName, buyerDetails.zipCode);
  await checkoutOverviewPage.clickOnFinish();
  await checkoutCompletePage.verifyPurchaseSuccess();
  await checkoutCompletePage.goBackToProducts();
  await inventoryPage.verifyHomePageLoaded();
});
