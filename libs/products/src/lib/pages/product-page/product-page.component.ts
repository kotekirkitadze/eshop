import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product: Product = {};
  quantity = 0;
  endSubs$: Subject<number> = new Subject<number>();
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.productid) {
        this._getProduct(params.productid);
      }
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.next(1);
    this.endSubs$.complete();
  }

  private _getProduct(productId: string) {
    this.productsService
      .getProductbyId(productId)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((product: Product) => {
        this.product = product;
      });
  }

  addProductToCart() {}
}
