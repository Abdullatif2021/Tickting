import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { catchError } from 'rxjs/operators';
import { ApiInterface } from '../core/models/api-interface';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  refreshData = new BehaviorSubject(false);;

  constructor(
    private http: HttpClient,
    private paginationService: PaginationService
  ) { }

  public checkRefreshData(): Observable<boolean> {
    return this.refreshData;
  }

  public setRefreshData(value) {
    this.refreshData.next(value); 
  }

  /**
   * Request for get all activities
   * @public
   * @param {Object} appliedFilters
   * @param {number} page
   * @param {number} pageSize
   * @param {string} orderBy
   * @param {string} orderMethod
   * @return {Observable<ApiInterface>}
   */
  getActivities(appliedFilters: any, page: number, pageSize: number, orderBy: string, orderMethod: string): Observable<ApiInterface> {
    var body = {
      sort: orderMethod,
      order_by: orderBy,
      page: page,
      per_page: pageSize,
      filters: appliedFilters
    };
    /* if (this.filterService.fields) {
      body.filters = this.filterService.fields;
    }
    if (this.sortOptions.order_by) {
      body.sort = this.sortOptions.sort;
      body.order_by = this.sortOptions.order_by;
    } */
    return this.http.post<ApiInterface>(AppConfig.endpoints.getActivities, body).pipe(
      catchError(this.handleError)
    );
  }

  getContainer(): Observable<any> {
    return this.http.get(AppConfig.endpoints.getAllContainers)
  }

  createActivity(data): Observable<any> {
    return this.http.post(AppConfig.endpoints.createActivity, data)
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
