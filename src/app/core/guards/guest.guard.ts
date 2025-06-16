import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
  CanLoad,
  Route,
  UrlSegment,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate, CanLoad {
  constructor(private router: Router) {}

  private isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  canActivate(): boolean | UrlTree {
    return !this.isAuthenticated() || this.router.parseUrl('/dashboard');
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    return !this.isAuthenticated() || this.router.parseUrl('/dashboard');
  }
}
