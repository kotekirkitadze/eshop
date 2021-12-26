import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import { AccordionModule } from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';

import { ProductsModule } from '@appbit/products';
import { UiModule } from '@appbit/ui';
import { OrdersModule } from '@appbit/orders';
import { HttpClientModule } from '@angular/common/http';
import { UsersModule, UsersService } from '@appbit/users';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
const routes = [{ path: '', component: HomePageComponent }];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    UiModule,
    AccordionModule,
    ProductsModule,
    OrdersModule,
    UsersModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule implements OnInit {
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.initAppSession();
  }
}
