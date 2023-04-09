import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.css']
})
export class TimeTrackerComponent implements OnInit {
  min: number;
  @Output() saveNewValue = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  save(): void{
    this.saveNewValue.emit(this.min);
    this.min = null;
  }
}
