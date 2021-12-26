import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Cart } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(this.getCart());

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

  emptyCart() {
    const initialCart = {
      items: [],
    };
    const initialCartJSON = JSON.stringify(initialCart);
    localStorage.setItem(CART_KEY, initialCartJSON);
    this.cart$.next(initialCart);
  }

  getCart(): Cart {
    const cartAsString = localStorage.getItem(CART_KEY);
    let cart: Cart = {};
    if (cartAsString != undefined) {
      cart = JSON.parse(cartAsString);
    }

    return cart;
  }

  setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
    const cart: Cart = this.getCart();

    const existingCart = cart.items?.find(
      (e) => e.productId == cartItem.productId
    );
    if (existingCart) {
      cart.items?.map((item) => {
        if (item.productId == existingCart.productId) {
          if (item.quantity && cartItem?.quantity) {
            if (updateCartItem) {
              item.quantity = cartItem.quantity;
            } else {
              item.quantity = item.quantity + cartItem.quantity;
            }
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

  deleteCartItem(productId: string) {
    const cart: Cart = this.getCart();
    const newCart = cart.items?.filter((item) => item.productId !== productId);

    cart.items = newCart;

    const cartJsonString = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJsonString);
    this.cart$.next(cart);
  }
}
