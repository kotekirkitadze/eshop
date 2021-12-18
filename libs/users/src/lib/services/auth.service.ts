import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private api = `${environment.apiUrl}users/`;

  login(email: string, password: string): Observable<User> {
    return this.http.post(`${this.api}login`, { email, password });
  }
}
