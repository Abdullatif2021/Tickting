import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PaginationService {

  resultsCountChanges = new EventEmitter<number>(); //render pages count
  loadingStateChanges = new EventEmitter<boolean>();//lodaing state
  rppValueChanges = new EventEmitter<number>();//rows per page 
  currentPageChanges = new EventEmitter<number>();//current page number

  resultsCount = 0;
  current_page: any = 1;
  pagination_loading_state = true;
  rpp: any = 4;

  constructor() { }

  updateResultsCount(count: number) {
    this.resultsCountChanges.emit(count);
    this.resultsCount = count;
  }

  updateLoadingState(state: boolean) {
    this.pagination_loading_state = state;
    this.loadingStateChanges.emit(state);
  }

  updateRpp(rpp: number) {
    this.rpp = rpp;
    this.rppValueChanges.emit(rpp);
  }

  updateCurrentPage(page: number, ignore: boolean = false) {
    this.current_page = page;
    if (!ignore) { this.currentPageChanges.emit(page); }
  }

  resetCurrentPage() {
    this.current_page = 1;
  }

}
