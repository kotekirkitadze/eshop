import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '@env/environment';
import { User } from '../models/user';
import { UsersFacade } from '../state/users.facade';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private usersFacade: UsersFacade) {}

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

  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.api}get/count`)
      .pipe(map((o: any) => o.userCount));
  }

  initAppSession() {
    this.usersFacade.buildUserSession();
  }
}
