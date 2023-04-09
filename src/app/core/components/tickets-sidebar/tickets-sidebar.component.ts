import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { TicketStatisticsService } from 'src/app/services/ticket-statistics.service';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */


@Component({
  selector: 'app-tickets-sidebar',
  templateUrl: './tickets-sidebar.component.html',
  styleUrls: ['./tickets-sidebar.component.css']
})

export class TicketsSidebarComponent implements OnInit {
  @Output() filterApplied = new EventEmitter<any>();
  problem_areas: any;
  groups: any;

  status: any;
  priority: any;
  aggregatedFilter: any = {};

  constructor(private TicketStatisticsService: TicketStatisticsService) { }

  ngOnInit(): void {
    this.renderSideBarData();
  }

  renderSideBarData() {
    this.TicketStatisticsService.getTicketsSatistics().subscribe(resposne => {
      this.renderTicketSidebar(resposne.data);
    }, error => {
      console.log(error);
    });
  }

  renderTicketSidebar(data) {
    this.groups = this.renderTicketsGroups(data['groups']);;
    this.status = this.renderTicketsStates(data['states']);
    this.priority = this.renderTicketsPriorities(data['priorities']);
    this.problem_areas = this.renderTicketsProblemArea(data['problem_areas']);
  }

  renderTicketsStates(states) {
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

  renderTicketsPriorities(priorities) {
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

  renderTicketsProblemArea(problem_areas) {
    let result = [];
    if (problem_areas) {
      problem_areas.forEach(item => {
        result.push({
          'id': item.problem_area,
          'label': item.problem_area,
          'count': item.count,
        });
      });
    }
    return result;
  }

  renderTicketsGroups(groups) {
    let result = [];
    if (groups) {
      groups.forEach(item => {
        result.push({
          'id': item.group.id,
          'label': item.group.name,
          'count': item.count,
        });
      });
    }
    return result;
  }

  emitFilters(): void{
    this.filterApplied.emit(this.aggregatedFilter);
  }
  problemAreaFilterChange($event: any): void {
    this.aggregatedFilter.problem_area_text = $event;
    this.emitFilters();
  }

  groupsFilterChanged($event: any): void {
    this.aggregatedFilter.group_id = $event;
    this.emitFilters();
  }

  statusFilterChanged($event: any): void {
    this.aggregatedFilter.state_id = $event;
    this.emitFilters();
  }

  priorityFilterChanged($event: any): void {
    this.aggregatedFilter.priority_id = $event;
    this.emitFilters();
  }
}
