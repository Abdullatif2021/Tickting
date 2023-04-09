import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfig } from '../config/app.config';
import { ApiInterface } from '../core/models/api-interface';

@Injectable({
  providedIn: 'root'
})

export class TicketStatisticsService {

  constructor(
    private http: HttpClient
  ) { }
 

  getTicketsSatistics(): Observable<any> {
    return this.http.get<ApiInterface>(AppConfig.endpoints.getTicketsSatistics);
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
