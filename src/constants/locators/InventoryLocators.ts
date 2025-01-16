import { Role } from '../enum/Roles';

export class InventoryLocators {
  static readonly title = '[data-test="title"]';
  static readonly inventoryContainer = '[data-test="inventory-container"]';
  static readonly inventoryItem = '[data-test="inventory-item"]';
  static readonly itemAddToCartButton = { role: Role.Button, name: 'Add to cart' };
  static readonly itemName = '[data-test="inventory-item-name"]';
  static readonly itemPrice = '[data-test="inventory-item-price"]';
  static readonly itemDescription = '[data-test="inventory-item-desc"]';
  static readonly itemImage = 'img.inventory_item_img';
  static readonly sortContainer = '[data-test="product-sort-container"]';
  static readonly sideMenu = 'div.bm-menu-wrap';
  static readonly openSideMenuButton = { role: Role.Button, name: 'Open Menu' };
  static readonly closeSideMenuButton = { role: Role.Button, name: 'Close Menu' };
  static readonly logoutButton = { role: Role.Link, name: 'Logout' };
  static readonly aboutButton = { role: Role.Link, name: 'About' };
  static readonly cartButton = '[data-test="shopping-cart-link"]';
}
