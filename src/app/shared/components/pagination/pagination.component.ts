import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';
import { faCaretLeft, faBackward, faCaretRight, faForward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit, OnChanges {

  @Input() theme = 'dark';
  @Input() results_count: number;
  @Input() loading = true;
  /** Options of page size */
  @Input() pageSizeOptions = [
    { key: 25, value: 25 },
    { key: 50, value: 50 },
    { key: 100, value: 100 },
  ];
  /** page size */
  @Input() rpp;
  /** When any of parts of this component changed */
  @Output() pageChanged = new EventEmitter<{page: number, rpp: number}>();
  /* icons */
  faCaretLeft = faCaretLeft;
  faBackward = faBackward;
  faCaretRight = faCaretRight;
  faForward = faForward;
  pages;
  current_page = 1;
  constructor(
    private paginationService: PaginationService
  ) { }

  ngOnInit() {
    this.loading = this.paginationService.pagination_loading_state;
  }

  /**
   * @public
   * If input of component change
   * @param {SimpleChanges} changes
   * @return {void}
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.results_count || changes.rpp){
      this.updatePages();
    }
  }
  /**
   * Emit Results for parents
   * @return {void}
   */
  emitResults(): void{
    this.pageChanged.emit({page: this.current_page, rpp: this.rpp});
  }

  rppChanged(event) {
    this.current_page = 1;
    this.rpp = event.value;
    this.emitResults();
  }

  updatePages() {
    this.pages = Math.ceil(this.results_count / this.rpp);
  }

  prevPage() {
    this.current_page = this.current_page - 1;
    this.emitResults();
  }

  nextPage() {
    this.current_page = this.current_page + 1;
    this.emitResults();
  }

  lastPage() {
    this.current_page = this.pages;
    this.emitResults();
  }

  firstPage() {
    this.current_page = 1;
    this.emitResults();
  }

  changePage(page) {
    this.current_page = page;
    this.emitResults();
  }

  range(start, end, max, min) {
    const range = [];
    for (let i = start; i < end && i <= max; ++i) {
      if (i > min) {
        range.push(i);
      } else {
        end++;
      }
    }
    return range;
  }

}
