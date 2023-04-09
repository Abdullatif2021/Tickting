import { state } from '@angular/animations';
import { TicketsService } from '../../../services/tickets.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { faCheckSquare, faPaperclip, faTrashAlt, faEdit, faDownload, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';


interface state {
  id: number;
  label: string;
  state: string;
  background: string;
}
interface priorityarea {
  id: number;
  label: string;
  priority: string;
  background: string;
}
@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit {
  // change status
  States: state[] = [
    { id: 8, state: "To do Bug", label: "Da fare Bug", background: "#DE2F2F" },
    { id: 9, state: "To do new imp.", label: "Da fare nuova imp.", background: "#00C5FF" },
    { id: 10, state: "Under processing", label: "In lavorazione", background: "#FF7F00" },
    { id: 11, state: "Ready", label: "Pronto", background: "#9300FF" },
    { id: 12, state: "Testing", label: "Testing", background: "#2FD1DE" },
    { id: 13, state: "Closed", label: "Chiuso", background: "#2FDE4A" },
    { id: 14, state: "Completed", label: "Completato", background: "#00901C" }
  ];
  selectedStates: any = { id: 8, state: "To do Bug", label: "Da fare Bug", background: "#DE2F2F" };

  activityId = 4;
  optionColor: any = '#fff';
  // change status

  // change priority
  priorty: priorityarea[] = [
    { id: 1, priority: "Urgent", label: "Urgente", background: "#DE2F2F" },
    { id: 2, priority: "High", label: "Alta", background: "#FEDA44" },
    { id: 3, priority: "Normal", label: "Normale", background: "#00C5FF" },
    { id: 4, priority: "Low", label: "Bassa", background: "#707781" },
    { id: 5, priority: "Nessuna", label: "None", background: "#e2e2e2" }
  ];
  selectedPriorty: any = { id: 4, priority: "Low", label: "Bassa", background: "#707781" };
  priortyId = '';
  optionColor2: any = '#fff';
  // change priority

  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faDownload = faDownload;
  faCheckSquare = faCheckSquare;
  faPaperclip = faPaperclip;
  faPlusCircle = faPlusCircle;

  assigned_users = [{
    "user": {
      "id": 33,
      "name": "SALZANO CLAUDIO",
      "tipo": "PO",
      "tipologia": "DE"
    }
  }, {
    "user": {
      "id": 44,
      "name": "SALZANO CLAUDIO",
      "tipo": "PO",
      "tipologia": "DE"
    }
  }]
  assigned_testers = [{
    "user": {
      "id": 33,
      "name": "SALZANO CLAUDIO",
      "tipo": "PO",
      "tipologia": "DE"
    }
  }, {
    "user": {
      "id": 33,
      "name": "SALZANO CLAUDIO",
      "tipo": "PO",
      "tipologia": "DE"
    }
  }]

  users_badge = [{
    "user": {
      "id": 44,
      "name": "SALZANO CLAUDIO",
      "tipo": "PO",
      "tipologia": "DE"
    }
  }]

  testers_badge = [{
    "user": {
      "id": 55,
      "name": "SALZANO CLAUDIO",
      "tipo": "PO",
      "tipologia": "DE"
    }
  }]

  toggleUsersList = false;
  toggleTestersList = false;

  //global var
  activity: any;
  //form groups
  activityBaseInfo: FormGroup;
  activityDetails: FormGroup;
  activityComments: FormGroup;
  activityActivities: FormGroup;
  activityAttachments: FormGroup;

  constructor(
    private modalService: ModalService,
    private ticketservice: TicketsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.optionColor = this.States[0].background;
    this.optionColor2 = this.priorty[0].background;
    this.activityBaseInfo = this.formBuilder.group({
      title: [],
      description: []
    });
    this.activityDetails = this.formBuilder.group({
      userFilterCtrl:[],
      state: [8],
      priority: [4],
      assigned_users_ctrl: [],
      assigned_testers: []
    });
    this.activityActivities = this.formBuilder.group({});
  }

  changeAssignedUsers(event) {
    console.log('user', event.option.value);
    this.users_badge.push({
      "user": {
        "id": 570,
        "name": "SALZANO CLAUDIO",
        "tipo": "PO",
        "tipologia": "DE"
      }
    })
  }

  changeAssignedTesters(event) {
    console.log('tester', event.option.value);
    this.testers_badge.push({
      "user": {
        "id": 570,
        "name": "SALZANO CLAUDIO",
        "tipo": "PO",
        "tipologia": "DE"
      }
    })
  }

  toggleVisibility() { }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  openModal(id: string) {
    this.modalService.open(id);
    this.modalService.close('custom-modal-2')
  }

  selectState(event: Event) {
    this.selectedStates = (event.target as HTMLSelectElement).value;
    this.States.forEach(el => {
      if (el.id == this.selectedStates) {
        this.optionColor = el.background;
      }
    });
    this.ticketservice.ChangeStatus(this.activityId, this.selectedStates, 'ACTIVITY').subscribe(data => {
    });
  }

  selectPriorty(event: Event) {
    this.selectedPriorty = (event.target as HTMLSelectElement).value;
    this.priorty.forEach(el => {
      if (el.id == this.selectedPriorty) {
        this.optionColor2 = el.background;
      }
    });
    this.ticketservice.ChangePriorty(this.activityId, this.selectedPriorty, 'ACTIVITY').subscribe(data => {
    });
  }

  showUsersList() {
    this.toggleUsersList = (this.toggleUsersList) ? false : true
    this.toggleTestersList = false;
  }

  showTestersList() {
    this.toggleTestersList = (this.toggleTestersList) ? false : true
    this.toggleUsersList = false;
  }


}

