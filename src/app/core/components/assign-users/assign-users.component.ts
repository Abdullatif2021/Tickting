import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { faTimes, faSearch, faSearchDollar } from '@fortawesome/free-solid-svg-icons';
import { EntityService } from '../../../services/entity.service';
import { EntityType, FullUserInterface, UserInterface } from '../../models/details-models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-assign-users',
  templateUrl: './assign-users.component.html',
  styleUrls: ['./assign-users.component.css']
})
export class AssignUsersComponent implements OnInit, OnChanges {

  @Input() entityId: number;
  @Input() entityType: EntityType;

  @Output() userClicked = new EventEmitter<any>();
  @Input() users: UserInterface[] = [];
  faTimes = faTimes;
  faSearch = faSearch;
  faSearchDollar = faSearchDollar;
  subject = new Subject();
  searchText: string;
  @Input() clickedUser: FullUserInterface[];
  constructor(
    private entityService: EntityService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.entityId && changes.entityType) {
        this.loadUser();
    }
  }

  private loadUser(): void {
    this.entityService.loadMembersToAssign(this.entityId, this.entityType)
      .pipe(takeUntil(this.subject))
      .subscribe(
        results => {
          console.log(results);
          this.users = results.data;
          this.users.forEach(user => user.selected = false);
          this.clickedUser.forEach(user => {
            const nUser = user.user;
            nUser.selected = true;
            this.users.push(nUser);
          });
        }, error => {
          console.log(error);
        }
      ); 
  }
  
  whenUserClicked(user: UserInterface): void {
    if (user.selected) {
      return;
    }
    user.selected = true;
    this.clickedUser.push({ user });
    this.userClicked.emit({ user, selected: true });
  }

  whenUserDeselected(user: UserInterface): void {
    user.selected = false;
    this.clickedUser.filter(clicUser => clicUser.user.id !== user.id);
    this.userClicked.emit({ user, selected: false });
  }

}
