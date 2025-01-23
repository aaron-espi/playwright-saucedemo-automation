import { CommonLocators } from './CommonLocators';

export class CheckoutInfoLocators {
  static readonly title = CommonLocators.title;
  static readonly nameInput = '[data-test="firstName"]';
  static readonly lastNameInput = '[data-test="lastName"]';
  static readonly zipInput = '[data-test="postalCode"]';
  static readonly continueButton = '[data-test="continue"]';
  static readonly cancelButton = '[data-test="cancel"]';
  static readonly continueFailureMessage = CommonLocators.errorMessage;
}
