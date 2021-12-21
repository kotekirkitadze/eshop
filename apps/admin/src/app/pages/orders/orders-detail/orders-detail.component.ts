import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@appbit/orders';
import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss'],
})
export class OrdersDetailComponent implements OnInit {
  order: Order = {};
  orderStatus = [];
  selectedStatus;
  constructor(
    private orderService: OrdersService,
    private router: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  onStatusChange(event) {
    this.orderService
      .updateOrderStatus({ status: event.value }, this.order.id)
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Order is updated`,
          });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Order is not updated',
          });
        }
      );
  }

  private _mapOrderStatus() {
    this.orderStatus = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label,
      };
    });
  }

  private _getOrder() {
    this.router.params.subscribe((params) => {
      if (params.id) {
        this.orderService.getOrderById(params.id).subscribe((order: Order) => {
          this.order = order;
          this.selectedStatus = order.status;
        });
      }
    });
  }
}
