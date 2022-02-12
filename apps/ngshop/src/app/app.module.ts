import { NgModule } from '@angular/core';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, UsersModule, UsersService } from '@appbit/users';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@env/environment';
import { NgxStripeModule } from 'ngx-stripe';
import { ProfileNavComponent } from './shared/profile-nav/profile-nav.component';
import { NgSelect2Module } from 'ng-select2';
import { UserChatModule } from '@appbit/user-chat';

const routes = [{ path: '', component: HomePageComponent }];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    ProfileNavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    UiModule,
    UserChatModule,
    AccordionModule,
    ProductsModule,
    OrdersModule,
    UsersModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    NgSelect2Module,
    NgxStripeModule.forRoot(
      'pk_test_51KAzSoFWBvgcccXyPMqB4Wzt8fbMh1vLTEZCjlmspUek7iomQZ5QTQzP6QSJkIZXFq8ll2nYkxzdYUFcxEbotad900air6iV9W'
    ),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private usersService: UsersService) {
    this.usersService.initAppSession();
  }
}
