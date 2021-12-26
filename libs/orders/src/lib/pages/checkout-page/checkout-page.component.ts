import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as countriesLib from 'i18n-iso-countries';
import { Cart, CartItem } from '../../models/cart';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/order.service';
import { ORDER_STATUS } from '../../order.constants';

declare const require: any;
@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  checkoutForm: FormGroup = new FormGroup({});
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId = '61c78ec0dd3033fc769c2d52';
  countries: any[] = [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCartItems();
    this._getCountries();
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items?.map((item: CartItem) => {
      return {
        product: item.productId,
        quantity: item.quantity,
      };
    }) as OrderItem[];
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutForm.invalid) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.getCheckoutForm.street.value,
      shippingAddress2: this.getCheckoutForm.apartment.value,
      city: this.getCheckoutForm.city.value,
      zip: this.getCheckoutForm.zip.value,
      country: this.getCheckoutForm.country.value,
      phone: this.getCheckoutForm.phone.value,
      status: +Object.keys(ORDER_STATUS)[0],
      user: this.userId,
      dateOrdered: `${Date.now()}`,
    };

    this.ordersService.createOrder(order).subscribe(
      () => {
        this.router.navigate(['/success']);
        this.cartService.emptyCart();
      },
      () => {
        //maybe some error to show to the user
      }
    );
  }

  private _getCountries() {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.countries = Object.entries(
      countriesLib.getNames('en', { select: 'official' })
    ).map((entry) => {
      return {
        id: entry[0],
        name: entry[1],
      };
    });
  }

  private _initForm() {
    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  get getCheckoutForm() {
    return this.checkoutForm.controls;
  }
}
