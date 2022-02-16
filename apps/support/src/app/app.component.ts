import { Component } from '@angular/core';
import { UsersService } from '@appbit/users';
@Component({
  selector: 'appbit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private userService: UsersService) {
    userService.observeCurrentUser().subscribe(console.log);
  }
  title = 'support';
}
