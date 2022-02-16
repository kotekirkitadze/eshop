import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalstorageService
  ) {}

  // route: ActivatedRouteSnapshot,
  // state: RouterStateSnapshot
  canActivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const token = this.localStorageService.getToken();

    if (token) {
      // eslint-disable-next-line no-var
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken.isAdmin && !this._tokenExpired(decodedToken.exp)) {
        return true;
      } else if (
        decodedToken.isSupport &&
        !this._tokenExpired(decodedToken.exp)
      ) {
        return true;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }

  private _tokenExpired(expiration: any): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
