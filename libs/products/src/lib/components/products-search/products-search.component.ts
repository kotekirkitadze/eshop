import { Component, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'products-search',
  templateUrl: './products-search.component.html',
  styleUrls: ['./products-search.component.scss'],
})
export class ProductsSearchComponent {
  // @Output() product: Product;
  value2: any;
}
