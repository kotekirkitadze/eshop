import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { CartService } from './services/cart.service';

export const ordersRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
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
