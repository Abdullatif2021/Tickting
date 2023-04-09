import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {

  /** Title of dialog */
  title = 'HI';  

  constructor(
    private dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = this.data.title;
  }

  ngOnInit(): void { }

  /**
   * When dialog saved
   * @return {void}
   */
  confirm(): void {   
    this.dialogRef.close(true);
  }
  /**
   * When dialog closed.
   * @return {void}
   */
  close(): void { 
    this.dialogRef.close(false);
  }
}
