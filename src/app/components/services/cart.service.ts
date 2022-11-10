import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable, Observer } from 'rxjs';
import { ProductsService } from './products.service';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _subscriptionObservable: Observable<ShoppingCart>;
  private _subscribers: Array<Observer<ShoppingCart>> = new Array<
    Observer<ShoppingCart>
  >();
  private _products: Product[];

  constructor(private _productService: ProductsService) {
    //this._productService.all().subscribe((products)=>this._products = products);
    this._products = this._productService.getProducts();
    this._subscriptionObservable = new Observable<ShoppingCart>(
      (observer: Observer<ShoppingCart>) => {
        this._subscribers.push(observer);
        observer.next(this.retrieve());
        return () => {
          this._subscribers = this._subscribers.filter(
            (obs) => obs !== observer
          );
        };
      }
    );
  }

  public get(): Observable<ShoppingCart> {
    return this._subscriptionObservable;
  }

  public addItem(product: Product, quantity: number): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.productId === product.id);
    if (item === undefined) {
      item = new CartItem();
      item.productId = product.id;
      cart.items.push(item);
    }

    item.quantity += quantity;
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);

    this.calculateCart(cart);
    //this.save(cart);
    this.dispatch(cart);
  }

  private calculateCart(cart: ShoppingCart): void {
    cart.itemsTotal = cart.items
      .map(
        (item) =>
          item.quantity *
          this._products.find((p) => p.id === item.productId).price
      )
      .reduce((previous, current) => previous + current, 0);
  }

  private retrieve(): ShoppingCart {
    const cart = new ShoppingCart();

    return cart;
  }

  private save(cart: ShoppingCart): void {}

  private dispatch(cart: ShoppingCart): void {
    this._subscribers.forEach((sub) => {
      try {
        sub.next(cart);
      } catch (e) {
        //
      }
    });
  }

  getQuantity() {
    return this._products.length;
  }
}
