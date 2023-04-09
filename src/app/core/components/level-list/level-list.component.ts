import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.css']
})
export class LevelListComponent implements OnInit {

  @Input() title: string = 'Sidebar List';
  @Input() items = [];
  @Input() filter: string;

  @Output() filterChanged = new EventEmitter<any>();
  isActive = false;
  selectedItem = false;

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
  }

  updateFilter(value) {
    this.isActive = true;
    this.selectedItem = value;
    console.log('Value => ', value);
    this.filterChanged.emit(value);
  }

  clearFilters(): void {
    this.isActive = false;
    this.selectedItem = false;
    this.filterChanged.emit(null);
  }

}
