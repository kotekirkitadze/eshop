import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UsersService } from '@appbit/users';
import { Subject, takeUntil } from 'rxjs';
import { OrdersService } from '../../services/order.service';
import { ORDER_STATUS } from '../../order.constants';
import { Order } from '../../models/order';
@Component({
  selector: 'orders-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  userId = '';
  orders: Order[] = [];
  orderStatus: any = ORDER_STATUS;
  endSubs$: Subject<number> = new Subject<number>();
  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this._checkIdAndGetData();
  }
  ngOnDestroy(): void {
    this.endSubs$.next(1);
    this.endSubs$.complete();
  }
  private _checkIdAndGetData() {
    this.route.params.pipe(takeUntil(this.endSubs$)).subscribe((params) => {
      if (params.id) {
        this.userId = params.id;
        this.orderService
          .getOrdersByUserId(params.id)
          .pipe(takeUntil(this.endSubs$))
          .subscribe((orders) => {
            this.orders = orders;
            console.log(orders);
          });
      }
    });
  }
  showOrder(orderId: string) {
    this.router.navigate([`history/details/${orderId}`]);
  }
}
