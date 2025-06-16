import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
  CanLoad,
  Route,
  UrlSegment
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router) {}

  private isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  canActivate(): boolean | UrlTree {
    return this.isAuthenticated() || this.router.parseUrl('/auth/login');
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    return this.isAuthenticated() || this.router.parseUrl('/auth/login');
  }
}

