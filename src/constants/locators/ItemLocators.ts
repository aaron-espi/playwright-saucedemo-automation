import { CommonLocators } from './CommonLocators';

export class ItemLocators {
  static readonly inventoryItem = CommonLocators.inventoryItem;
  static readonly itemDetailsContainer = '.inventory_details_container';
  static readonly itemAddToCartButton = CommonLocators.itemAddToCartButton;
  static readonly itemRemoveFromCartButton = CommonLocators.itemRemoveFromCartButton;
  static readonly itemName = CommonLocators.itemName;
  static readonly itemPrice = CommonLocators.itemPrice;
  static readonly itemDescription = CommonLocators.itemDescription;
  static readonly itemImage = 'img.inventory_details_img';
  static readonly backToProductsButton = '[data-test="back-to-products"]';
}
