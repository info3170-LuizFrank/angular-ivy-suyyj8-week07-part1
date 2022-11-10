import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input() product: Product | null = null;
}
