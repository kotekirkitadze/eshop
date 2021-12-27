import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/order.service';

@Component({
  selector: 'orders-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
})
export class ThankYouComponent implements OnInit, OnDestroy {
  endSubs$: Subject<number> = new Subject<number>();
  constructor(
    private ordersService: OrdersService,
    private cartService: CartService
  ) {}

  ngOnDestroy(): void {
    this.endSubs$.next(1);
    this.endSubs$.complete();
  }

  ngOnInit(): void {
    const orderData = this.ordersService.getCachedOrderData();

    this.ordersService
      .createOrder(orderData)
      .pipe(takeUntil(this.endSubs$))
      .subscribe(
        () => {
          this.cartService.emptyCart();
          this.ordersService.removeCachedOrderData();
        },
        () => {
          //maybe some error to show to the user
        }
      );
  }

  //ასევე გვჭირდება იმპლემენტაცია სეშენ აიდით
  //რომ გავაკეთებინოთ ვალიდაცია და საქსეს ფეიჯზე გადასვლისას
  //ორდერი არ გააკეთოს პირდაპირ ფეიმენთის გარეშე
}
