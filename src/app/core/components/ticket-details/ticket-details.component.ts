import { number } from 'ngx-custom-validators/src/app/number/validator';
import { TicketsService } from '../../../services/tickets.service';
import { Component, OnInit, Input, ViewChild, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { faCheckSquare, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FilePickerComponent } from "ngx-awesome-uploader";
import { ValidationError } from "ngx-awesome-uploader";
import { FilePreviewModel } from "ngx-awesome-uploader";
import { UploaderCaptions } from "ngx-awesome-uploader";
import { HttpClient } from "@angular/common/http";
import { CustomFilePickerAdapter } from "../../../shared/custom-file-picker.adapter";
import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";
import { UploadService } from 'src/app/services/upload.service';


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
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
   // upload file
   @ViewChild("uploader", { static: false }) uploader: FilePickerComponent;
   public adapter = new CustomFilePickerAdapter(this.http);
   public myFiles: FilePreviewModel[] = [];
   captions: UploaderCaptions = {
     dropzone: {
       title: "Fayllari bura ata bilersiz",
       or: "və yaxud",
       browse: "Fayl seçin"
     },
     cropper: {
       crop: "Kəs",
       cancel: "Imtina"
     },
     previewCard: {
       remove: "Sil",
       uploadError: "Fayl yüklənmədi"
     }
   };


  // end of upload file
  // change status
  States: state[] = [
    { id: 1, state: "Open", label: "Aperto", background: "#FEDA44" },
    { id: 2, state: "In-progress", label: "In corso", background: "#00C5FF" },
    { id: 3, state: "Answered", label: "Risposto", background: "#FF7F00" },
    { id: 4, state: "Ready", label: "Pronto", background: "#9300FF" },
    { id: 5, state: "Testing", label: "Testing", background: "#2FD1DE" },
    { id: 6, state: "Closed", label: "Chiuso", background: "#2FDE4A" },
    { id: 7, state: "Refused", label: "Rifiutato", background: "#DE2F2F" },
  ];
  selectedStates: any = '';
  selectedcontainer: any;
  selectedStates_color: any;
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
  selectedPriorty: any = '';
  priortyId = '';
  optionColor2: any = '#fff';
  // change priority
  create_activity_name: any = '';
  // create activity

  createactivity =
    {
    activity_id:null,
    ticket_id: 4,
    name: null ,
    state_id: null,
    container_id: null,
    description: 'kfkghfgthkdxfgkdyuhcghxfug',
    priority_id: 1,
    start_date: null,
    end_date: null
  }



  // create activity
  faCheckSquare = faCheckSquare;
  faPaperclip = faPaperclip;
  refresh = null;
  groupA: any;
  attachments: any;
  state: any;
  fileToUpload: File = null;
  comments: any[];
  activities: any[];
  checkList = null;
  url= "www.edryhrstxr.com"
  id = 4;
  load = false;
  users = [
    {
      "user": {
        "id": 570,
        "name": "SALZANO CLAUDIO",
        "tipo": "PO",
        "tipologia": "DE"
      }
    },
    {
      "user": {
        "id": 570,
        "name": "SALZANO CLAUDIO",
        "tipo": "PO",
        "tipologia": "DE"
      }
    }
  ]
  option: any = null
  constructor(
    private modalService: ModalService,
    private ticketservice: TicketsService,
    private http: HttpClient,
    private uploadservice: UploadService
  ) { }
  create = false;
  selected: any;
  parentComments: any;
  containers: any;
  @Input() childid: number;
  ngOnInit(): void {
    this.optionColor = this.States[0].background;
    this.optionColor2 = this.priorty[0].background;
    this.ticketservice.getTicketById(this.id).subscribe(data => {
      this.load = true;
      this.groupA = data.data
      this.state = data.data.state
      this.attachments = data.data.attachments
      this.parentComments = data.data.comments
      this.selectedStates = data.data.state.label
      this.selectedStates_color = data.data.state.color
      this.activities = data.data.activities
      console.log(this.groupA);
    }
    );
    // drop down

      // drop down
  }
  toggleVisibility() {

  }
  closeModal(id: string) {33
    this.modalService.close(id);
  }
  openModal(id: string) {
    this.modalService.open(id);
  }
  selectState(id) {
    this.selected= id.label
    this.selectedStates = id.id
    this.States.forEach(el => {
      if (el.id == this.selectedStates) {
        this.optionColor = el.background;
      }
    });
    this.ticketservice.ChangeStatus(this.activityId, this.selectedStates, 'ACTIVITY').subscribe(data => {
    });
  }
  selectcontainer(event: Event) {
    this.selectedcontainer = (event.target as HTMLSelectElement).value;
   this.createactivity.container_id = this.selectedcontainer
    console.log(this.selectedcontainer);
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

  // upload file

//   onFileSelected(files: FileList) {
//     this.fileToUpload = files.item(0);
//     this.uploadservice.uploadFile(this.fileToUpload, this.id, 'TICKET').subscribe(data => {
//       console.log(data)
//     })
//     console.log(this.fileToUpload);
//   }
//   goToLink(){
//     window.open(this.url, "_blank");
// }
  // end of upload file
  openmodal() {
    this.ticketservice.getContainer().subscribe(data => {
      console.log(data)
      this.containers = data.data;
    })

    this.create = true;
  }
  close_modal() {
    this.create = false;

  }
  createticket() {
      console.log("jesgioerg");
    this.ticketservice.createActivity(this.createactivity).subscribe(data => {
      console.log(data);
      if ({ success: true }) {
        this.ngOnInit()
      }
    })
  }
  childToParent(name) {
    console.log(name)
    this.refresh = name;
    if (this.refresh=1) {
      this.ngOnInit()

    }
  }
  setCurrentSelection() {

  }
}
