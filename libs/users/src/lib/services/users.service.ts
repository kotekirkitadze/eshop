import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  private api = `${environment.apiUrl}users/`;

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.api);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.api}${userId}`);
  }

  createUser(userData: User): Observable<User> {
    return this.http.post<User>(this.api, userData);
  }

  updateUser(userData: User): Observable<User> {
    return this.http.put<User>(`${this.api}${userData.id}`, userData);
  }

  deletUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.api}${userId}`);
  }
}
