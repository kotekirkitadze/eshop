import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Cart } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(this.getCart());

  constructor() {}

  initCartLocalStorage(): void {
    const cart = localStorage.getItem(CART_KEY);
    if (!cart) {
      const initialCart = {
        items: [],
      };
      const initialCartJSON = JSON.stringify(initialCart);
      localStorage.setItem(CART_KEY, initialCartJSON);
    }
  }

  getCart(): Cart {
    const cartAsString = localStorage.getItem(CART_KEY);
    let cart: Cart = {};
    if (cartAsString != undefined) {
      cart = JSON.parse(cartAsString);
    }

    return cart;
  }

  setCartItem(cartItem: CartItem): Cart {
    let cart: Cart = this.getCart();

    const existingCart = cart.items?.find(
      (e) => e.productId == cartItem.productId
    );
    if (existingCart) {
      cart.items?.map((item) => {
        if (item.productId == existingCart.productId) {
          if (item.quantity && cartItem?.quantity) {
            item.quantity = item.quantity + cartItem.quantity;
          }
        }
      });
    } else {
      cart.items?.push(cartItem);
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    this.cart$.next(cart);
    return cart;
  }
}
