import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable, Subscription } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  public products: Product[];
  public cart: Observable<ShoppingCart>;
  public itemCount: number;
  public cartItems: CartItem[];

  private _cartSubscription: Subscription;

  public constructor(
    private _productsService: ProductsService,
    private _cartService: CartService
  ) {}

  public emptyCart(): void {}

  public ngOnInit(): void {
    this.products = this._productsService.getProducts();
    this.cart = this._cartService.get();
    this._cartSubscription = this.cart.subscribe((cart) => {
      this.cartItems = cart.items;
      this.itemCount = cart.items
        .map((x) => x.quantity)
        .reduce((p, n) => p + n, 0);
    });
  }

  public ngOnDestroy(): void {
    if (this._cartSubscription) {
      this._cartSubscription.unsubscribe();
    }
  }
}
