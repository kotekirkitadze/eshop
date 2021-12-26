import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  setToken(data: any) {
    localStorage.setItem(TOKEN, data);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN) || '';
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN);
  }

  isValidToken(): boolean {
    const token = this.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[0]));
      return this._tokenExpired(tokenDecode.exp);
    } else {
      return false;
    }
  }

  getUserIdFromToke() {
    const token = this.getToken();

    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));

      if (tokenDecode) {
        return tokenDecode.userId;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  private _tokenExpired(expiration: any): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
