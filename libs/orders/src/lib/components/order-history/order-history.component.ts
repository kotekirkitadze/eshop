import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@appbit/users';
import { Subject, takeUntil } from 'rxjs';
import { OrdersService } from '../../services/order.service';

@Component({
  selector: 'orders-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  userId = '';
  endSubs$: Subject<number> = new Subject<number>();
  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService
  ) {}
  ngOnInit(): void {
    this._checkId();
  }
  ngOnDestroy(): void {
    this.endSubs$.next(1);
    this.endSubs$.complete();
  }
  private _checkId() {
    this.route.params.pipe(takeUntil(this.endSubs$)).subscribe((params) => {
      if (params.id) {
        this.userId = params.id;
        this.orderService
          .getOrdersByUserId(params.id)
          .pipe(takeUntil(this.endSubs$))
          .subscribe(console.log);
      }
    });
  }
}
