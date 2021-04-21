import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ValidationGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let url: string = state.url;
    let val = localStorage.getItem('isUserLoggedIn');
    if (val != null && val == "true") {

      if (url == "/login") {
        return this.router.parseUrl('/home');
      }
      else {
        return true;
      }

    }
    else {
      return this.router.parseUrl('/login');
    }
  }

}
