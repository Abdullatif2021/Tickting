import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {UserService} from '../../services/user.service';

@Injectable()
export class PermissionGuard implements CanActivate{
  /**
   * Create a new instance from PermissionGuard
   * @constructor
   * @public
   * @param {Router} router
   * @param {UserService} userService
   */
  constructor(
    private router: Router,
    private userService: UserService
  ){
  }
  /**
   * Check if current route can activated by current user
   * @override
   * @public
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @return {Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree}
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const permissions = route.data.permissions;
    if (!permissions){
      return this.router.navigate(['/403']);
    }
    if (this.userService.currentUserCan(permissions)){
      return true;
    }else {
      this.router.navigate(['/403']);
      return false;
    }
  }
}
