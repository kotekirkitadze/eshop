import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../model';

@Injectable({ providedIn: 'root' })
export class UserDetailService {
  private api = `${environment.apiUrl}users/`;

  constructor(private http: HttpClient) {}

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.api}${userId}`);
  }
}
