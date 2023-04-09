import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { catchError } from 'rxjs/operators';
import { ApiInterface } from '../core/models/api-interface';
import { throwError } from 'rxjs';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient,
    private paginationService: PaginationService
  ) { }

  CreateComment( entity_id , type , comment, update_comment) {
    const body = {
      entity_id: entity_id,
      entity_type: type,
      comment: comment,
      update_comment: update_comment
     };
    return this.http.post(AppConfig.endpoints.createcomment, body);
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
