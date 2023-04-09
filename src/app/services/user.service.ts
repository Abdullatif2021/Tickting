import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';
import { ApiInterface } from '../core/models/api-interface';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
    // Get user when application initialized.
    this.load().subscribe(
      results => {
        if (results.data){
          localStorage.removeItem('User');
          localStorage.setItem('User', JSON.stringify(results.data));
        }
      }
    );
  }

  /**
   * Get current user from localstorage
   * @return {any}
   */
  load(): Observable<ApiInterface> {
    return this.http.get<ApiInterface>(AppConfig.endpoints.getCookieInfo);
  }
  /**
   * Get current user from localstorage
   * @return {any}
   */
  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('User'));
  }
  /**
   * Check if current user can do some actions
   * @public
   * @param {string[]} permissions
   * @return {boolean}
   */
  currentUserCan(permissions: string[]): boolean {
    const user = this.getCurrentUser();
    return user && user.permissions.some(permission => permissions.indexOf(permission) > -1);
  }

  flushUserInfo() {
    localStorage.removeItem('user');
    localStorage.removeItem('AppConfig');
  }

  logoutUser(): Observable<any> {
    return this.http.post(AppConfig.endpoints.logout, []);
  }

}
