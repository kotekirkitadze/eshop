import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { OrdersService } from '../../services/order.service';
import { Location } from '@angular/common';

@Component({
  selector: 'orders-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss'],
})
export class HistoryDetailComponent implements OnInit, OnDestroy {
  order: any = {};
  endSubs$: Subject<number> = new Subject<number>();
  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService,
    private router: Router,
    private location: Location
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
        this.orderService
          .getOrderById(params.id)
          .pipe(takeUntil(this.endSubs$))
          .subscribe((order) => {
            this.order = order;
          });
      }
    });
  }

  backToLists(): void {
    this.location.back();
  }
}
