import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/order.service';

@Component({
  selector: 'orders-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  totalPrice = 100;
  endSubs$: Subject<number> = new Subject<number>();
  isCheckout = false;
  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private router: Router
  ) {
    this.router.url.includes('checkout')
      ? (this.isCheckout = true)
      : (this.isCheckout = false);
  }

  ngOnInit(): void {
    this._getOrderSummary();
  }
  ngOnDestroy(): void {
    this.endSubs$.next(1);
    this.endSubs$.complete();
  }

  private _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items?.map((item) => {
          this.ordersService
            .getProductbyId('' + item.productId)
            .pipe(take(1))
            .subscribe((product) => {
              this.totalPrice += product.price * (item.quantity ?? 1);
            });
        });
      }
    });
  }

  navigateToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
