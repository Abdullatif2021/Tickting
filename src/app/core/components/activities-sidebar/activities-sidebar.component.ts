import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivityStatisticsService } from 'src/app/services/activity-statistics.service';
import {ItemType} from '../folders/folders.component';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */


@Component({
  selector: 'app-activities-sidebar',
  templateUrl: './activities-sidebar.component.html',
  styleUrls: ['./activities-sidebar.component.css']
})

export class ActivitiesSidebarComponent implements OnInit {

  @Output() filterApplied = new EventEmitter<any>();

  status: any;
  priority: any;
  assign: any;
  testers: any;
  folders: any;
  aggregatedFilter: any  = {};

  constructor(private ActivityStatisticsService: ActivityStatisticsService) {
  }

  ngOnInit(): void {
    this.renderSideBarData();
  }

  renderSideBarData() {
    this.ActivityStatisticsService.getActivitySatistics().subscribe(resposne => {
      this.renderActivitySidebar(resposne.data);
    }, error => {
      console.log(error);
    });
  }

  renderActivitySidebar(data) {
    this.status = this.renderActivityStates(data['states']);
    this.priority = this.renderActivityPriorities(data['priorities']);
    this.assign = this.renderAssignedUsers(data['assigned_users']);
    this.testers = this.renderTestersUsers(data['testers']);
    this.folders = data['folders'];
  }

  renderActivityStates(states) {
    let result = [];
    if (states) {
      states.forEach(item => {
        result.push({
          'id': item.state.id,
          'label': item.state.label,
          'color': item.state.color,
          'count': item.count,
        });
      });
    }
    return result;
  }

  renderActivityPriorities(priorities) {
    let result = [];
    if (priorities) {
      priorities.forEach(item => {
        result.push({
          'id': item.priority.id,
          'label': item.priority.label,
          'color': item.priority.color,
          'count': item.count,
        });
      });
    }
    return result;
  }

  renderAssignedUsers(assignedusers) {
    let result = [];
    if (assignedusers) {
      assignedusers.forEach(item => {
        result.push({
          'id': item.user.user.id,
          'name': item.user.user.name,
          'count': item.count
        });
      });
    }
    return result;
  }

  renderTestersUsers(testers) {
    let result = [];
    if (testers) {
      testers.forEach(item => {
        result.push({
          'id': item.user.user.id,
          'name': item.user.user.name,
          'count': item.count
        });
      });
    }
    return result;
  }

  stateChanged($event: any): void {
    this.aggregatedFilter.state_id = $event;
    this.emitFilters();
  }
  priorityChanged($event: any): void {
    this.aggregatedFilter.priority_id = $event;
    this.emitFilters();
  }
  assignedUserChanged($event: any): void {
    this.aggregatedFilter.assign_user_id = $event;
    this.emitFilters();
  }
  folderChange(event): void {
    this.aggregatedFilter.folder_id = null;
    this.aggregatedFilter.subfolder_id = null;
    this.aggregatedFilter.container_id = null;
    switch (event.type) {
      case ItemType.FOLDER: {
        this.aggregatedFilter.folder_id = event.id;
        break;
      }
      case ItemType.SUB_FOLDER: {
        this.aggregatedFilter.subfolder_id = event.id;
        break;
      }
      case ItemType.CONTAINER: {
        this.aggregatedFilter.container_id = event.id;
      }
    }
    this.emitFilters();
  }
  emitFilters(): void{
    this.filterApplied.emit(this.aggregatedFilter);
  }
  // testerUserChanged($event: any): void {
  //   this.aggregatedFilter.
  // }
}
