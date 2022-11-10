//https://codesandbox.io/s/angular-shopping-cart-v2-forked-c7hvnj

import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: Product[];
  productsNumber: number;
  constructor(private _productsService: ProductsService) {}

  ngOnInit() {
    this.products = this._productsService.getProducts();
    this.productsNumber = this.products.length;
  }

  addToCart(product): void {
    this._productsService.event.emit(product);
  }
}
