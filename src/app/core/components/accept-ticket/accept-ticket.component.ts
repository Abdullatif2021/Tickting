import { FilterService } from 'src/app/services/filter.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { Component, OnInit ,Inject } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { TicketsService } from '../../../services/tickets.service';
@Component({
  selector: 'app-accept-ticket',
  templateUrl: './accept-ticket.component.html',
  styleUrls: ['./accept-ticket.component.css']
})
export class AcceptTicketComponent implements OnInit {
  /** entityId */
  entityId: number;
  /** entity type */
  entityType: string;
  disabled: boolean;
  comment = null;
  approve: boolean = true;
  selectedValue = null;
  constructor(
    private dialogRef: MatDialogRef<AcceptTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modalService: ModalService,
    private ticketservice: TicketsService,
    private router: Router,
    private filterservice: FilterService
  ) {
    this.entityId = data.id;
    this.entityType = data.type;
    console.log(this.entityId);

  }

  ngOnInit(): void {
  }

  validateTicket(selectedValue) {
    this.disabled = true;
    if (selectedValue == '2') {
      this.approve = false;
    }
    this.ticketservice.validateTicket(this.comment, this.entityId, this.approve).subscribe(data => {
      this.close();

   }, error => {
     if (error) {
      console.log(error);
    }
    })
    this.dialogRef.close();

  }
  close(): void{
    this.dialogRef.close();
  }
}
