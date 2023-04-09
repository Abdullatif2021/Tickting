import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-meter',
  templateUrl: './meter.component.html',
  styleUrls: ['./meter.component.css']
})

export class MeterComponent implements OnInit {

  @Input() value: string;

  constructor() {
  }

  ngOnInit(): void {
    this.value = this.value + '%';
  }

}
