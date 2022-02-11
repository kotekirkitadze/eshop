import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatMessageComponent } from './pages/chatbox/chat-message/chat-message.component';
import { ChatboxComponent } from './pages/chatbox/chatbox.component';
import { ListComponent } from './pages/chatbox/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatboxComponent,
    ListComponent,
    ChatMessageComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
