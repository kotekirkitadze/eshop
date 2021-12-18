import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@appbit/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getOrders();
  }

  private _getOrders(): void {
    this.ordersService.getOrders().subscribe((orders: Order[]) => {
      this.orders = orders;
    });
  }

  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this order?',
      header: 'Delete order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderId).subscribe(
          (order: Order) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Order is deleted`,
            });
            this._getOrders();
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Order is not deleted',
            });
          }
        );
      },
    });
  }
  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }
}
