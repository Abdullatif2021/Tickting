import { Component, OnInit } from '@angular/core';
import { TablesConfig } from 'src/app/config/tables.config';
import { ConfigService } from 'src/app/services/config.service';
import { FilterService } from 'src/app/services/filter.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { TicketsService } from 'src/app/services/tickets.service';
import {Subject} from 'rxjs';
import {ApiInterface} from '../../../../core/models/api-interface';
import {takeUntil} from 'rxjs/operators';
import {UserService} from '../../../../services/user.service';
import {EPermission} from '../../../../config/permissions-enum';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})

export class TicketsComponent implements OnInit {

  page = 'tickets';
  dataSource: any;
  dataSourceCount: number;
  columns = TablesConfig.table.tickets.cols;
  /** Count of activities. */
  dataSize;
  /** Current page. */
  currentPage = 1;
  /** Page size */
  rpp = 25;
  /** Applied filters on activity list. */
  appliedFilters = {};
  /** Sort option */
  sortOption: {key: string, method: string} = {key: null, method: null};
  /** If component in the loading mode. */
  loading: boolean;
  /** Subject obj. */
  subject = new Subject<ApiInterface>();
  /** Can create a new ticket */
  canCreateTicket: boolean;

  constructor(
    private TicketService: TicketsService,
    private paginationService: PaginationService,
    private filterService: FilterService,
    private ConfigService: ConfigService,
    private userService: UserService,
    private notifier: NotifierService

  ) {
    this.canCreateTicket = true;
    this.notifier = notifier;
  }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.loading = true;
    this.TicketService.getTickets(this.appliedFilters, this.currentPage, this.rpp, this.sortOption.key, this.sortOption.method)
      .pipe(takeUntil(this.subject))
      .subscribe(response => {
      this.dataSource = response.data.tickets;
      this.dataSize = response.data.count;
        this.loading = false;
        if (response.responseCode !== 200) {
          this.notifier.notify('error', response.message);
        }
      }, error => {
        this.loading = false;
      }
    );
  }

  /**
   * When pagination options changed
   * @public
   * @param $event
   * @return {void}
   */
  paginationChanged($event): void{
    this.rpp = $event.rpp;
    this.currentPage = $event.page;
    this.loadTickets();
    this.fixScroll();
  }
  /**
   * Fix scroll of page.
   * @public
   * @return {void}
   */
  fixScroll(): void{
    let top = document.getElementById('scroll-helper');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }
  /**
   * When apply filters on table.
   * @public
   * @param $event
   * @return {void}
   */
  whenApplyFilter($event: any): void{
    this.appliedFilters = $event;
    this.currentPage = 1;
    this.loadTickets();
    this.fixScroll();
  }
  /**
   * When apply sort on table.
   * @public
   * @param $event
   * @return {void}
   */
  whenApplySort($event): void{
    this.sortOption.key = $event.column;
    this.sortOption.method = $event.method;
    this.currentPage = 1;
    this.loadTickets();
  }
}
