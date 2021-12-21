import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@appbit/orders';
import { ProductsService } from '@appbit/products';
import { UsersService } from '@appbit/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboardStatistics = [];

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
    ]).subscribe((values) => (this.dashboardStatistics = values));
  }
}
