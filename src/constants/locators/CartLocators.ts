import { CommonLocators } from './CommonLocators';

export class CartLocators {
  static readonly title = CommonLocators.title;
  static readonly checkoutButton = '[data-test="checkout"]';
  static readonly continueShoppingButton = '[data-test="continue-shopping"]';
  static readonly cartQuantity = '[data-test="cart-quantity-label"]';
  static readonly inventoryItem = CommonLocators.inventoryItem;
  static readonly itemName = CommonLocators.itemName;
  static readonly itemDescription = CommonLocators.itemDescription;
  static readonly itemPrice = CommonLocators.itemPrice;
  static readonly removeItemButton = CommonLocators.itemRemoveFromCartButton;
}
