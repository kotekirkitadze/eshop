import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { FormsModule } from '@angular/forms';

export const routes: Route[] = [{ path: 'cart', component: CartPageComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BadgeModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputNumberModule,
    FormsModule,
  ],
  declarations: [CartIconComponent, CartPageComponent, OrderSummaryComponent],
  exports: [CartIconComponent, CartPageComponent, OrderSummaryComponent],
})
export class OrdersModule {
  constructor(private cartService: CartService) {
    //თუ ამ მოდუსლ სხვაგანაც გამოვიყენებთ, მაშინ
    //პრობლემას შექმნის, რადგან ამ ფუნქციის გამოძახება ერთხელ გვინდა
    //ამიტომ სხვა ადგილი უნდა მოვძებნოთ აპლიკაციაში, სადაც ეს მხოლოდ
    // ერთხელ გამოიძახება - მაგალითად ჰედერ.
    this.cartService.initCartLocalStorage();
  }
}
