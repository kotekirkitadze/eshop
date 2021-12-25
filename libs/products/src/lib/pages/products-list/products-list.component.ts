import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: Category[] = [];
  endSubs$: Subject<number> = new Subject<number>();
  checked = false;
  isCategoryPage = false;
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      params.categoryid
        ? this._getProducts([params.categoryid])
        : this._getProducts();

      params.categoryid
        ? (this.isCategoryPage = true)
        : (this.isCategoryPage = false);
    });
    this._getCategories();
  }

  ngOnDestroy(): void {
    this.endSubs$.next(1);
    this.endSubs$.complete();
  }

  private _getProducts(categoriesFilter?: string[]): void {
    this.productsService
      .getProducts(categoriesFilter)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }

  private _getCategories(): void {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  categoryFilter() {
    const selectedCategories = this.categories
      .filter((cat: Category) => cat.checked)
      .map((cat: Category) => cat.id) as string[];

    this._getProducts(selectedCategories);
  }
}
