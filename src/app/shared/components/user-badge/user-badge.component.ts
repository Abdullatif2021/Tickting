import { Component, Input, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-user-badge',
  templateUrl: './user-badge.component.html',
  styleUrls: ['./user-badge.component.css']
})

export class UserBadgeComponent implements OnInit {

  /** Array of users */
  @Input() items: any[];
  show: boolean;

  /** If current user can assign/unassign users */
  @Input() canAssignUser: boolean;
  @Input() showTable: boolean;
 
  faTimes = faTimes;

  constructor() {
  }

  ngOnInit(): void {
  }

  getName(item: any) {
    return item.user ? item.user.name : (item.id ? item.name : item);
  }

  showlist() { 
    
    this.show = !this.show;
    console.log(this.show)
  }

}
