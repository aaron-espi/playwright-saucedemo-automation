import { Role } from '../enum/Roles';

export class CommonLocators {
  static readonly title = '[data-test="title"]';
  static readonly cartButton = '[data-test="shopping-cart-link"]';
  static readonly itemAddToCartButton = { role: Role.Button, name: 'Add to cart' };
  static readonly itemRemoveFromCartButton = { role: Role.Button, name: 'Remove' };
  static readonly itemName = '[data-test="inventory-item-name"]';
  static readonly itemPrice = '[data-test="inventory-item-price"]';
  static readonly itemDescription = '[data-test="inventory-item-desc"]';
  static readonly errorMessage = '[data-test="error"]';
  static readonly inventoryItem = '[data-test="inventory-item"]';
}
