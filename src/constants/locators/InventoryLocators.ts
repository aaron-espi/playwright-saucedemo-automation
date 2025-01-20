import { Role } from '../enum/Roles';
import { CommonLocators } from './CommonLocators';

export class InventoryLocators {
  static readonly title = CommonLocators.title;
  static readonly inventoryContainer = '[data-test="inventory-container"]';
  static readonly inventoryItem = '[data-test="inventory-item"]';
  static readonly itemAddToCartButton = CommonLocators.itemAddToCartButton;
  static readonly itemRemoveFromCartButton = CommonLocators.itemRemoveFromCartButton;
  static readonly itemName = CommonLocators.itemName;
  static readonly itemPrice = CommonLocators.itemPrice;
  static readonly itemDescription = CommonLocators.itemDescription;
  static readonly itemImage = 'img.inventory_item_img';
  static readonly sortContainer = '[data-test="product-sort-container"]';
  static readonly sideMenu = 'div.bm-menu-wrap';
  static readonly openSideMenuButton = { role: Role.Button, name: 'Open Menu' };
  static readonly closeSideMenuButton = { role: Role.Button, name: 'Close Menu' };
  static readonly allItemsButton = { role: Role.Link, name: 'All Items' };
  static readonly aboutButton = { role: Role.Link, name: 'About' };
  static readonly logoutButton = { role: Role.Link, name: 'Logout' };
  static readonly resetAppStateButton = { role: Role.Link, name: 'Reset App State' };
  static readonly cartButton = CommonLocators.cartButton;
  static readonly shoppingCartBadge = '[data-test="shopping-cart-badge"]';
}
