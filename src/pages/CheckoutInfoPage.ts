import { expect, Page } from '@playwright/test';
import { CheckoutInfoLocators } from '../constants/locators/CheckoutInfoLocators';
import { StringConstants } from '../constants/StringConstants';

export class CheckoutInfoPage {
  readonly page: Page;

  readonly nameRequiredMessageText: string = StringConstants.NAME_REQUIRED;
  readonly lastNameRequiredMessageText: string = StringConstants.LAST_NAME_REQUIRED;
  readonly zipRequiredMessageText: string = StringConstants.ZIP_REQUIRED;
  readonly checkoutInfoPageTitleText: string = StringConstants.CHECKOUT_INFO_PAGE_TITLE;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyInputsAreVisible() {
    await expect(this.page.locator(CheckoutInfoLocators.nameInput)).toBeVisible();
    await expect(this.page.locator(CheckoutInfoLocators.lastNameInput)).toBeVisible();
    await expect(this.page.locator(CheckoutInfoLocators.zipInput)).toBeVisible();
  }

  async verifyCheckoutInfoPageLoaded() {
    await expect(this.page.locator(CheckoutInfoLocators.title)).toBeVisible();
    await expect(this.page.locator(CheckoutInfoLocators.title)).toHaveText(this.checkoutInfoPageTitleText);
    await this.verifyInputsAreVisible();
  }
  async verifyNameRequiredMessage() {
    await this.verifyErrorMessage(this.nameRequiredMessageText);
  }

  async verifyLastnameRequiredMessage() {
    await this.verifyErrorMessage(this.lastNameRequiredMessageText);
  }

  async verifyZipRequiredMessage() {
    await this.verifyErrorMessage(this.zipRequiredMessageText);
  }

  async verifyErrorMessage(expectedMessage: string) {
    await expect(this.page.locator(CheckoutInfoLocators.continueFailureMessage)).toBeVisible();
    await expect(this.page.locator(CheckoutInfoLocators.continueFailureMessage)).toHaveText(expectedMessage);
  }

  async fillCheckoutInfo(firstName, lastName, zip) {
    if (firstName) await this.fillNameInput(firstName);
    if (lastName) await this.fillLastNameInput(lastName);
    if (zip) await this.fillZipInput(zip);
    await this.clickOnContinue();
  }

  async fillNameInput(name: string) {
    await this.page.locator(CheckoutInfoLocators.nameInput).fill(name);
  }

  async fillLastNameInput(lastName: string) {
    await this.page.locator(CheckoutInfoLocators.lastNameInput).fill(lastName);
  }

  async fillZipInput(zip: string) {
    await this.page.locator(CheckoutInfoLocators.zipInput).fill(zip);
  }

  async clickOnContinue() {
    await this.page.locator(CheckoutInfoLocators.continueButton).click();
  }

  async goBackToCart() {
    await this.page.locator(CheckoutInfoLocators.cancelButton).click();
  }
}
