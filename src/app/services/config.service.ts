import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { AppConfig } from '../config/app.config';
import { ApiInterface } from '../core/models/api-interface';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {
  private cachedConfig: any;
  configArray: [] = [];

  constructor(
    private http: HttpClient
  ) { }

  load(): Observable<ApiInterface> {
    return this.http.get<ApiInterface>(AppConfig.endpoints.getConfig).pipe(
      tap(results => {
          if (results && results.data){
            this.cachedConfig = results.data;
            localStorage.removeItem('AppConfig');
            localStorage.setItem('AppConfig', JSON.stringify(results.data));
          }
      })
    );
  }
  /**
   * Get configuration from local storage
   * @public
   * @deprecated // Must change to load configuration.
   * @return {Object}
   */
  getConfigs(): any {
    return JSON.parse(localStorage.getItem('AppConfig'));
  }
  /**
   * Load config from cache as observable
   * @param {boolean} skipCachedConfig
   * @return {Observable}
   */
  loadConfig(skipCachedConfig?: boolean): Observable<any>{
    if (skipCachedConfig || !this.cachedConfig){
      return this.load();
    }
    return of(this.cachedConfig);
  }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('');
  }

}
