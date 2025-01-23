import { expect, Page } from '@playwright/test';
import { CheckoutCompleteLocators } from '../constants/locators/CheckoutCompleteLocators';
import { StringConstants } from '../constants/StringConstants';

export class CheckoutCompletePage {
  readonly page: Page;

  readonly orderConfirmationMessage: string = StringConstants.ORDER_CONFIRMATION;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyPurchaseSuccess() {
    await expect(this.page.locator(CheckoutCompleteLocators.orderConfirmationHeader)).toBeVisible();
    await expect(this.page.locator(CheckoutCompleteLocators.orderConfirmationHeader)).toHaveText(
      this.orderConfirmationMessage
    );
  }

  async goBackToProducts() {
    await this.page.locator(CheckoutCompleteLocators.backToProductsButton).click();
  }
}
