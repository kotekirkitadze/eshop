import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Cart, CartItem, CartItemDetailed } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/order.service';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit, OnDestroy {
  endSubs$: Subject<number> = new Subject<number>();
  cartItemsDetailed: CartItemDetailed[] = [];
  cartCount = 0;
  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this._getCartDetails();
  }
  ngOnDestroy(): void {
    this.endSubs$.next(1);
    this.endSubs$.complete();
  }

  private _getCartDetails() {
    this.cartService.cart$
      .pipe(takeUntil(this.endSubs$))
      .subscribe((cart: Cart) => {
        this.cartItemsDetailed = [];
        this.cartCount = cart.items?.length ?? 0;
        cart.items?.forEach((cartItem: CartItem) => {
          this.ordersService
            .getProductbyId('' + cartItem.productId)
            .pipe(takeUntil(this.endSubs$))
            .subscribe((product) => {
              this.cartItemsDetailed.push({
                product: product,
                quantity: cartItem.quantity,
              });
            });
        });
      });
  }

  backToShop() {
    this.router.navigate(['/products']);
  }
  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id);
  }
}
