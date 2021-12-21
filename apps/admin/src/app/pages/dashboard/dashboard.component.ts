import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@appbit/orders';
import { ProductsService } from '@appbit/products';
import { UsersService } from '@appbit/users';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboardStatistics = [];
  endSubs$: Subject<number> = new Subject<number>();
  constructor(
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productsService.getProductsCount(),
      this.usersService.getUsersCount(),
      this.ordersService.getTotalSales(),
    ])
      .pipe(takeUntil(this.endSubs$))
      .subscribe((values) => (this.dashboardStatistics = values));
  }

  ngOnDestroy(): void {
    this.endSubs$.next(1);
    this.endSubs$.complete();
  }
}
