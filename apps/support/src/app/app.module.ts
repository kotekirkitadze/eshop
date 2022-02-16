import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthGuard, UsersModule } from '@appbit/users';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { ChatMessageComponent } from './pages/chatbox/chat-message/chat-message.component';
import { ChatboxComponent } from './pages/chatbox/chatbox.component';
import { ListComponent } from './pages/chatbox/list/list.component';

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
    BrowserModule,
    FormsModule,
    UsersModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
