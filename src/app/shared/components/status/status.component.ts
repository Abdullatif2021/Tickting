import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  @Input() text:string;
  @Input() color:string; 

  constructor() { }

  ngOnInit(): void {
  }

}
