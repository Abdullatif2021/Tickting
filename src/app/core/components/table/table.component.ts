import {animate, state, style, transition, trigger} from '@angular/animations';
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {faCheckSquare, faPaperclip, faSortAmountDown, faSortAmountUp} from '@fortawesome/free-solid-svg-icons';
import {ModalService} from 'src/app/services/modal.service';
import {TicketsService} from 'src/app/services/tickets.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivityInterface, DetailsConfig, EntityType, TicketInterface} from '../../models/details-models';
import {ConfigService} from '../../../services/config.service';
import {BaseDetailsComponentComponent} from '../../../shared/components/base-details-component/base-details-component.component';
import { AcceptTicketComponent } from '../accept-ticket/accept-ticket.component';
import {UserService} from '../../../services/user.service';
import {EPermission} from '../../../config/permissions-enum';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*', padding: '0px', margin: '0px' })),
      transition('expanded <=> collapsed', animate('0.5s cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class TableComponent implements OnInit {

  @Input() page;
  @Input() dataSource;
  @Input() dataSourceCount;
  @Input() displayedColumns = [];
  /** When apply sort on any column in the table. */
  @Output() applySort = new EventEmitter<{column: string, method: string}>();
  /** When entity dialog closed */
  @Output() detailsDialogClosed = new EventEmitter<null>();
  @Output() vaildateDialogClosed = new EventEmitter<null>();
  canAcceptTicket: boolean;

  ticketId = '';
  currentSort = {
    subject: 'DESC',
    state_id: 'DESC',
    priority_id: 'DESC',
    group_id: 'DESC',
    problem_area_text: 'DESC',
    progress: 'DESC'
  };

  faCheckSquare = faCheckSquare;
  faPaperclip = faPaperclip;
  faSortAmountUp = faSortAmountUp;
  faSortAmountDown = faSortAmountDown;
  justify: 'center';

  constructor(
    private modalService: ModalService,
    private ticketservice: TicketsService,
    private dialog: MatDialog,
    private configService: ConfigService,
    private userService: UserService
  ) {
    this.canAcceptTicket = this.userService.currentUserCan([EPermission.CAN_VALIDATE_TICKET_PERMISSION]);
  }

  ngOnInit() {
    this.createTable();
  }

  createTable() {
    this.dataSource = new MatTableDataSource(this.dataSource);
    this.renderColumns();
  }

  renderColumns() {
    this.displayedColumns = this.displayedColumns.map(x => x.name);
  }


  /**
   * Open details of row.
   * @public
   * @param {Object} entity
   * @param {EntityType} entityType
   * @return {void}
   */
  openModal(entity: any, entityType: EntityType): void {
    this.dialog.open(BaseDetailsComponentComponent, {
        width: '100%',
        panelClass:'base-details',
        data: {
          id: entity.id,
          type: entityType
        }
      }).afterClosed().subscribe(
        data => {
          this.detailsDialogClosed.emit();
        }
    );
  }
   /**
   * Open details of row.
   * @public
   * @param {Object} entity
   * @param {EntityType} entityType
   * @return {void}
   */
    openModal2(entity: any, entityType: EntityType): void {
      this.dialog.open(AcceptTicketComponent, {
        width: '40%',
        data: {
          id: entity.id,
          type: entityType
        }
      }).afterClosed().subscribe(

        data => {
          this.vaildateDialogClosed.emit();
        }
      );

    }

  sortTable(field: string): void {
    // Emit apply sort.
    this.applySort.emit({
        column: field,
        method: this.currentSort[field] === 'DESC' ? 'ASC' : 'DESC'
    });
    // Update the value of the sort map.
    this.currentSort[field] = this.currentSort[field] === 'DESC' ? 'ASC' : 'DESC';
  }

  resetSortFields(field, value) {
    if (field) {
      this.currentSort = {
        subject: 'ASC',
        state_id: 'ASC',
        priority_id: 'ASC',
        group_id: 'ASC',
        problem_area_text: 'ASC',
        progress: 'ASC'
      };
      this.currentSort[field] = value;
    }
  }
}
