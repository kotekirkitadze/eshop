import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';

import { InputTextModule } from 'primeng/inputtext';

import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { SimpleAuthGuard } from '@appbit/users';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { HistoryDetailComponent } from './components/history-detail/history-detail.component';
import { FieldsetModule } from 'primeng/fieldset';

const UX_COMPONENTS = [
  ButtonModule,
  FieldsetModule,
  InputTextModule,
  CardModule,
  ColorPickerModule,
  InputNumberModule,
  InputTextareaModule,
  InputSwitchModule,
  DropdownModule,
  TableModule,
  TagModule,
  InputMaskModule,
];

export const routes: Route[] = [
  { path: 'cart', component: CartPageComponent },
  {
    path: 'checkout',
    canActivate: [SimpleAuthGuard],
    component: CheckoutPageComponent,
  },
  { path: 'history/:id', component: OrderHistoryComponent },
  { path: 'history/details/:id', component: HistoryDetailComponent },
  { path: 'success', component: ThankYouComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BadgeModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    UX_COMPONENTS,
  ],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent,
    OrderHistoryComponent,
    HistoryDetailComponent,
  ],
  exports: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent,
    OrderHistoryComponent,
    HistoryDetailComponent,
  ],
  providers: [],
})
export class OrdersModule {
  constructor(private cartService: CartService) {
    //?????? ?????? ?????????????????? ??????????????????????????? ????????????????????????????????????, ???????????????
    //??????????????????????????? ?????????????????????, ?????????????????? ?????? ???????????????????????? ?????????????????????????????? ?????????????????? ??????????????????
    //?????????????????? ???????????? ?????????????????? ???????????? ??????????????????????????? ?????????????????????????????????, ??????????????? ?????? ??????????????????
    // ?????????????????? ????????????????????????????????? - ??????????????????????????? ???????????????.
    this.cartService.initCartLocalStorage();
  }
}
