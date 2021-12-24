import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';

export const ordersRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, BadgeModule],
  declarations: [CartIconComponent],
  exports: [CartIconComponent],
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
