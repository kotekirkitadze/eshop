import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule } from '@angular/forms';

export const userChatRoutes: Route[] = [
  {
    path: 'userchat/:id',
    component: ChatComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(userChatRoutes), FormsModule],
  declarations: [ChatComponent],
  exports: [ChatComponent],
})
export class UserChatModule {}
