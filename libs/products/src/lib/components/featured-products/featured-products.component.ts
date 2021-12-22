import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  featuredProducts: Product[] = [];
  endSubs$: Subject<number> = new Subject<number>();
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this._getFeaturedProducts(4);
  }

  ngOnDestroy(): void {
    this.endSubs$.next(1);
    this.endSubs$.complete();
  }

  private _getFeaturedProducts(count: number) {
    return this.productsService
      .getFeaturedProducts(count)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((products: Product[]) => {
        this.featuredProducts = products;
      });
  }
}
