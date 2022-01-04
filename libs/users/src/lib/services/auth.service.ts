import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalstorageService,
    private router: Router
  ) {}

  private api = `${environment.apiUrl}users/`;

  login(email: string, password: string): Observable<User> {
    return this.http.post(`${this.api}login`, { email, password });
  }

  signUp({ email = '', name = '', password = '', phone = '' }) {
    return this.http.post(`${this.api}register`, {
      email,
      name,
      password,
      phone,
    });
  }

  logout() {
    this.localStorageService.removeToken();
    this.router.navigate(['/login']);
  }

  logOut() {
    this.localStorageService.removeToken();
  }
}
