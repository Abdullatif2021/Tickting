import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TablesConfig } from 'src/app/config/tables.config';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Subject } from 'rxjs';
import { ApiInterface } from '../../../../core/models/api-interface';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../../../../services/user.service';
import { EPermission } from '../../../../config/permissions-enum';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})

export class ActivitiesComponent implements OnInit, OnDestroy {
  /** Flag page name in the list. */
  page = 'activities';
  /** Columns to show in the list. */
  columns = TablesConfig.table.activities.cols;
  /** Activities. */
  dataSource: any;
  /** Count of activities. */
  dataSize;
  /** Current page. */
  currentPage = 1;
  /** Page size */
  rpp = 25;
  /** Applied filters on activity list. */
  appliedFilters = {};
  /** Sort option */
  sortOption: { key: string, method: string } = { key: null, method: null };
  /** If component in the loading mode. */
  loading: boolean;
  /** Subject obj. */
  subject = new Subject<ApiInterface>();
  /** Can create a new create activity. */
  canCreateActivity: boolean;
  /**
   * Create a new instance from activity component.
   * @constructor
   * @public
   * @param {ActivitiesService} ActivityService
   * @param {UserService} userService
   */
  constructor(
    private ActivityService: ActivitiesService,
    private userService: UserService,
  ) {
    this.canCreateActivity = this.userService.currentUserCan([
      EPermission.ADD_ACTIVITY_PERMISSION
    ]);
  }
  /**
   * When component init
   * @return {void}
   */
  ngOnInit(): void {
    this.loadActivities();
    this.ActivityService.refreshData.subscribe(value =>{ 
      this.loadActivities();
    })    
  }
  /**
   * Load activities form the service.
   * @return {void}
   */
  loadActivities(): void {
    this.loading = true;
    this.ActivityService.getActivities(this.appliedFilters, this.currentPage, this.rpp, this.sortOption.key, this.sortOption.method)
      .pipe(takeUntil(this.subject))
      .subscribe(response => {
        this.loading = false;
        if (response.responseCode == 200) {
          this.dataSource = response.data.activities;
          this.dataSource.forEach((element) => {
            element.tester = element.assignedUsers ? element.assignedUsers.filter((user) => user.role === 'TESTER') : [];
            element.assigned = element.assignedUsers ? element.assignedUsers.filter((user) => user.role === 'PROGREMMER') : [];
          });
          this.dataSize = response.data.count;
        } else {
          //TODO: SHow error message
        }
      }, error => {
        this.loading = false;
      }
      );
  }
  on_search($event) {
    console.log($event);
  }
  /**
   * When pagination options changed
   * @public
   * @param $event
   * @return {void}
   */
  paginationChanged($event): void {
    this.rpp = $event.rpp;
    this.currentPage = $event.page;
    this.loadActivities();
    this.fixScroll();
  }

  /**
   * When apply sort on table.
   * @public
   * @param $event
   * @return {void}
   */
  whenApplySort($event): void {
    this.sortOption.key = $event.column;
    this.sortOption.method = $event.method;
    this.currentPage = 1;
    this.loadActivities();
  }

  /**
   * When apply filters on table.
   * @public
   * @param $event
   * @return {void}
   */
  whenApplyFilter($event: any): void {
    this.appliedFilters = $event;
    this.currentPage = 1;
    this.loadActivities();
    this.fixScroll();
  }

  /**
   * Fix scroll of page.
   * @public
   * @return {void}
   */
  fixScroll(): void {
    let top = document.getElementById('scroll-helper');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }
  /**
   * When component destroyed
   * @return {void}
   */
  ngOnDestroy(): void {
    this.subject.next();
    this.subject.complete();
  }
}


