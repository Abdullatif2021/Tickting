import { Subject } from 'rxjs';
import { FilterService } from 'src/app/services/filter.service';
import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css']
})

export class SearchPanelComponent implements OnInit {

  _search: string;
  faSearch = faSearch;
  @Output() filterApplied = new EventEmitter<any>();
  aggregatedFilter: any  = {};
  @Output() searching = new EventEmitter<string>();

  constructor(
    private modalService: ModalService,
    private filterservice: FilterService
    ) {}
  ngOnInit(): void { }

  clear() {
    this._search = null;
    this.filterApplied.emit(null);

  }

  search(_search) {
    this.aggregatedFilter.Subject = _search;
    this.emitFilters();
  }
  emitFilters(): void{
    this.filterApplied.emit(this.aggregatedFilter);
  }
}
