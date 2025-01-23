import { CommonLocators } from './CommonLocators';

export class CheckoutOverviewLocators {
  static readonly finishButton = '[data-test="finish"]';
  static readonly itemName = CommonLocators.itemName;
  static readonly itemDescription = CommonLocators.itemDescription;
  static readonly itemPrice = CommonLocators.itemPrice;
  static readonly removeItemButton = CommonLocators.itemRemoveFromCartButton;
  static readonly inventoryItem = CommonLocators.inventoryItem;
}
