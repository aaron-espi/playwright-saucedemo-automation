import { Role } from '../enum/Roles';
import { CommonLocators } from './CommonLocators';

export class ItemLocators {
  static readonly itemDetailsContainer = '.inventory_details_container';
  static readonly itemAddToCartButton = CommonLocators.itemAddToCartButton;
  static readonly itemRemoveFromCartButton = CommonLocators.itemRemoveFromCartButton;
  static readonly itemName = CommonLocators.itemName;
  static readonly itemPrice = CommonLocators.itemPrice;
  static readonly itemDescription = CommonLocators.itemDescription;
}
