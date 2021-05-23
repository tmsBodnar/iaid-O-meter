import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Jakukante } from 'src/app/shared/models/Jakukante';
import { Kata } from 'src/app/shared/models/Kata';

@Component({
  selector: 'app-jakukante-edit-dialog',
  templateUrl: './jakukante-edit-dialog.component.html',
  styleUrls: ['./jakukante-edit-dialog.component.css']
})
export class JakukanteEditDialogComponent implements OnInit {

  jakukanteForm: FormGroup;
  jakukante?: Jakukante;

  constructor(public dialogRef: MatDialogRef<JakukanteEditDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA,) public data: any) {
      this.jakukanteForm = this.fb.group({
        'description': [this.data.jakukante?.description, Validators.required],
      });
  
    }
  ngOnInit(): void {
  }

  onSaveClicked(){
    this.dialogRef.close(this.data);
  }
  onCancelClick(){
    this.dialogRef.close();
  }

}
