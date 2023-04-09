import { EventEmitter, Injectable } from '@angular/core';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root'
})

export class FilterService {

  filters = new EventEmitter();
  fields = {
    problem_area_text: '',
    group_id: '',
    state_id: '',
    priority_id: '',
    subject: ''
  };

  constructor(private paginationService: PaginationService) { }

  /* update fields */
  updateProblemAreaFilter(value) {
    this.paginationService.resetCurrentPage();
    this.fields.problem_area_text = value;
    this.filters.emit(this.fields);
  }

  updateGroupaFilter(value) {
    this.paginationService.resetCurrentPage();
    this.fields.group_id = value;
    this.filters.emit(this.fields);
  }

  updateStatusFilter(value) {
    this.paginationService.resetCurrentPage();
    this.fields.state_id = value;
    this.filters.emit(this.fields);
  }

  updatePriorityFilter(value) {
    this.paginationService.resetCurrentPage();
    this.fields.priority_id = value;
    this.filters.emit(this.fields);
  }

  /* unset fields */
  unsetProblemAreaFilter() {
    this.paginationService.resetCurrentPage();
    this.fields.problem_area_text = '';
    this.filters.emit(this.fields);
  }

  unsetGroupaFilter() {
    this.paginationService.resetCurrentPage();
    this.fields.group_id = '';
    this.filters.emit(this.fields);
  }

  unsetStatusFilter() {
    this.paginationService.resetCurrentPage();
    this.fields.state_id = '';
    this.filters.emit(this.fields);
  }

  unsetPriorityFilter() {
    this.paginationService.resetCurrentPage();
    this.fields.priority_id = '';
    this.filters.emit(this.fields);
  }
  // search
  updateSearchFilter(_search) {
    this.paginationService.resetCurrentPage();
    this.fields.subject = _search;
    this.filters.emit(this.fields);
  }
  resetSearchFilter() {
    this.paginationService.resetCurrentPage();
    this.fields.subject = '';
    this.filters.emit(this.fields);
  }
}
