import { CartItem } from './cart-item';

export class ShoppingCart {
  items: CartItem[] = new Array<CartItem>();
  grossTotal: number = 0;
  itemsTotal: number = 0;

  public updateFrom(src: ShoppingCart) {
    this.items = src.items;
  }
}
