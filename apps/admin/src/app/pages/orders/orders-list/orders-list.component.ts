import { Component, OnInit } from '@angular/core';
import { OrderItem, Order } from '@appbit/orders';
@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];

  constructor() {}

  ngOnInit(): void {}

  deleteOrder(orderId: string) {}
  showOrder(orderId: string) {}
}
