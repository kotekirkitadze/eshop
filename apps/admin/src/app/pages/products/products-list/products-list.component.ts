import { Component, OnInit } from '@angular/core';
import { ProductsService, Product } from '@appbit/products';

@Component({
  selector: 'appbit-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this._getProducts();
  }

  deleteProduct(productId: string) {}
  updateProduct(productId: string) {}

  private _getProducts(): void {
    this.productService
      .getProducts()
      .subscribe((products) => (this.products = products));
  }
}
