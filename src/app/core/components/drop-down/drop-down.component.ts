import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit {

  optionColor: any;
  newOption: any;
  emptyDataSelection = {
    name: 'Select'
  };

  @Input() options: any;
  @Output() currentSelectionChange = new EventEmitter<object>();
  _currentSelection: any;
  get currentSelection() {
    return this._currentSelection;
  }
  @Input()
  set currentSelection(value) {
    this._currentSelection =
      value === '' || value === null || value === undefined
        ? this.emptyDataSelection
        : value;
  }

  constructor() {
    this.newOption = '';
  }

  ngOnInit() { }

  setCurrentSelection(option) {
    this.currentSelection = option;
    this.currentSelectionChange.emit(option);
  }

  addNewData() { }
}
