import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

export const routes: Route[] = [{ path: 'cart', component: CartPageComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BadgeModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputNumberModule,
  ],
  declarations: [CartIconComponent, CartPageComponent],
  exports: [CartIconComponent, CartPageComponent],
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
