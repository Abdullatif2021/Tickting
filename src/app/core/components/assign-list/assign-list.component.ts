import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign-list',
  templateUrl: './assign-list.component.html',
  styleUrls: ['./assign-list.component.css']
})
export class AssignListComponent implements OnInit {

  @Input() title: string = '';
  @Input() items = [];

  constructor() { }

  ngOnInit(): void {
  }

  filter() {
  }

}
