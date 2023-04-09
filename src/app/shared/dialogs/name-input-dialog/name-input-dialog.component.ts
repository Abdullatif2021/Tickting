import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormGroupKeysInterface} from '../../../core/models/form-group-keys-interface';

@Component({
  selector: 'app-name-input-dialog',
  templateUrl: './name-input-dialog.component.html',
  styleUrls: ['./name-input-dialog.component.css']
})
export class NameInputDialogComponent implements OnInit {

  /** Form group to show in this dialog */
  formGroup: FormGroup;
  /** Keys to show in the form. */
  keys: FormGroupKeysInterface[];
  /** Title of dialog */
  title = 'HI';
  constructor(
    private dialogRef: MatDialogRef<NameInputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) {
    this.keys = this.data.keys;
    this.title = this.data.title;
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({});
    this.initForm();
  }

  /**
   * Init forms with coming keys.
   * @return {void}
   */
  initForm(): void{
    this.keys.forEach((key) => {
      this.formGroup.addControl(key.key, new FormControl(
        {value: key.value, disabled: !key.visible},
          key.validators
      ));
    });
  }
  /**
   * When dialog saved
   * @return {void}
   */
  save(): void{
    this.dialogRef.close(this.formGroup.getRawValue());
  }
  /**
   * When dialog closed.
   * @return {void}
   */
  close(): void{
    this.dialogRef.close();
  }
}
