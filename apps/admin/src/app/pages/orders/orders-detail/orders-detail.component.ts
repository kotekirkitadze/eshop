import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@appbit/orders';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss'],
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
  order: Order = {};
  orderStatus = [];
  selectedStatus;
  endSubs$: Subject<number> = new Subject<number>();
  constructor(
    private orderService: OrdersService,
    private router: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  ngOnDestroy(): void {
    this.endSubs$.next(1);
    this.endSubs$.complete();
  }

  onStatusChange(event) {
    this.orderService
      .updateOrderStatus({ status: event.value }, this.order.id)
      .pipe(takeUntil(this.endSubs$))
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
    this.router.params.pipe(takeUntil(this.endSubs$)).subscribe((params) => {
      if (params.id) {
        this.orderService
          .getOrderById(params.id)
          .pipe(takeUntil(this.endSubs$))
          .subscribe((order: Order) => {
            this.order = order;
            this.selectedStatus = order.status;
          });
      }
    });
  }
}
