import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@appbit/users';
import { LocalstorageService } from 'libs/users/src/lib/services/localstorage.service';

@Component({
  selector: 'ngshop-profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.scss'],
})
export class ProfileNavComponent {
  isActive = false;
  isAuth = '';

  constructor(
    private authService: AuthService,
    private localStorageService: LocalstorageService,
    private router: Router
  ) {}

  logOut() {
    this.authService.logOut();
    this.isActive = !this.isActive;
  }

  toggleMenu() {
    this.isAuth = this.localStorageService.getToken();
    if (!this.isAuth) {
      this.router.navigate(['login']);
      return;
    }
    this.isActive = !this.isActive;
  }
}
