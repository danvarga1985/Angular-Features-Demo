import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {
  }

  // Angular will execute this code before the route is loaded, and will provide the parameters
  // Function can run both synchronously(observable or promise) or asynchronously(boolean)
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated()
      .then(
        (authenticated: boolean) => {
          // If user is logged in
          if (authenticated) {
            // return boolean
            return true;
          } else {
            // If user is logged out - return the user to 'home'
            // return Promise - 'navigate' function
            this.router.navigate(['/']);
            // 'return false' is optional here, because the original navigation is prevented anyway
            return false;
          }
        }
      );
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
