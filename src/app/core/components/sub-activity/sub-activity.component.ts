import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-sub-activity',
  templateUrl: './sub-activity.component.html',
  styleUrls: ['./sub-activity.component.css']
})
export class SubActivityComponent implements OnInit {

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

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }
  toggleVisibility() {

  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
  openModal(id: string) {
    this.modalService.open(id);
    this.modalService.close('custom-modal-6')
  }
}
