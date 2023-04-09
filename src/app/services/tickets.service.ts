import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { catchError } from 'rxjs/operators';
import { ApiInterface } from '../core/models/api-interface';
import { throwError } from 'rxjs';
import { PaginationService } from './pagination.service';
import { TicketInterface } from '../core/models/api-interface';
import { Observable } from 'rxjs';
import { FilterService } from './filter.service';


@Injectable({
  providedIn: 'root'
})

export class TicketsService {

  sortTable = new EventEmitter();
  sortOptions = {
    sort: 'ASC',
    order_by: ''
  }

  constructor(
    private http: HttpClient,
    private paginationService: PaginationService,
    private filterService: FilterService,
  ) { }
  ticketId = new EventEmitter<number>();
  ticketid = null;
  /**
   * Request for get all tickets.
   * @public
   * @param {Object} appliedFilters
   * @param {number} page
   * @param {number} pageSize
   * @param {string} orderBy
   * @param {string} orderMethod
   * @return {Observable<ApiInterface>}
   */
  getTickets(appliedFilters: any, page: number, pageSize: number, orderBy: string, orderMethod: string): Observable<ApiInterface> {
    var body = {
      sort: orderMethod,
      order_by: orderBy,
      page: page,
      per_page: pageSize,
      filters: appliedFilters
    };
    return this.http.post<ApiInterface>(AppConfig.endpoints.getTickets, body).pipe(
      catchError(this.handleError)
    );
  }

  createTicket(data): Observable<any> {
    const body = data;
    return this.http.post<TicketInterface>(AppConfig.endpoints.createTickets, body)
  }
  createActivity(data): Observable<any> {
    return this.http.post(AppConfig.endpoints.createActivity, data)
  }
  getGroups(): Observable<any> {
    return this.http.get(AppConfig.endpoints.getGroups)
  }

  getTicketById(id): Observable<any> {
    return this.http.get(AppConfig.endpoints.getTicketById(id))
  }
  // countiner
  getContainer(): Observable<any> {
    return this.http.get(AppConfig.endpoints.getAllContainers)
  }
  // countiner

  // validateTicket(data , id): Observable<any>
  // {
  //      const body = {
  //       ticket_id: id,
  //       approve: false,
  //       comment: data // required if approve is false
  //      };
  //    return this.http.post(AppConfig.endpoints.validateticket, body)
  //  }

  ChangeStatus(activity_id, state_id, type) {
    const body = {
      entity_id: activity_id,
      state_id: state_id,
      entity_type: type
    };
    return this.http.post(AppConfig.endpoints.changeticketStatus, body)
  }
  ChangePriorty(id, prio_id, type) {
    const body = {
      entity_id: id,
      priority_id: prio_id,
      entity_type: type
    };
    return this.http.post(AppConfig.endpoints.changePriorty, body)
  }
  validateTicket(data, id, approve): Observable<any> {
    const body = {
      ticket_id: id,
      approve: approve,
      comment: data // required if approve is false
    };
    return this.http.post(AppConfig.endpoints.validateticket, body)
  }

  sortTickets() {
    if (this.sortOptions) {
      this.sortTable.emit(this.sortOptions);
    }
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
