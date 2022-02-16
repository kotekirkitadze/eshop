import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthGuard, UsersModule, UsersService } from '@appbit/users';
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { ChatMessageComponent } from './pages/chatbox/chat-message/chat-message.component';
import { ChatboxComponent } from './pages/chatbox/chatbox.component';
import { ListComponent } from './pages/chatbox/list/list.component';
import { UXModule } from './UX-lib.module';
import { CheckboxModule } from 'primeng/checkbox';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ChatboxComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    ChatboxComponent,
    ListComponent,
    ChatMessageComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    UsersModule,
    HttpClientModule,
    CheckboxModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    UXModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private usersService: UsersService) {
    this.usersService.initAppSession();
  }
}
