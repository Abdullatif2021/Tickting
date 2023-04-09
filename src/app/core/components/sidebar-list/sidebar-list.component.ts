import { Component, Input, OnInit } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.css']
})
export class SidebarListComponent implements OnInit {

  @Input() items: [];
  @Input() title: string;
  @Input() filter: string;

  isActive = false;
  selectedItem = false;

  constructor(
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
  }

  updateFilter(value) {
    console.log(this)
    this.isActive = true;
    this.selectedItem = value;
    if (this.filter == 'problemarea') { 
      this.filterService.updateProblemAreaFilter(value);
    }
    if (this.filter == 'group') {
      this.filterService.updateGroupaFilter(value);
    }
  }

  clearFilters() {
    this.isActive = false; 
    this.selectedItem = false;
    if (this.filter == 'problemarea') { 
      this.filterService.unsetProblemAreaFilter();
    }
    if (this.filter == 'group') {
      this.filterService.unsetGroupaFilter();
    } 
  }

}
