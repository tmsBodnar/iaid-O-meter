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

  constructor(public dialogRef: MatDialogRef<JakukanteEditDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA,) public jakukante: Jakukante) {
      this.jakukanteForm = this.fb.group({
        'short': [this.jakukante?.short, Validators.required],
        'description': [this.jakukante?.description, Validators.required]
      });
  
    }
  ngOnInit(): void {
  }

  onSaveClicked(){
    this.jakukante = {
      short: this.jakukanteForm.controls['short'].value,
      description : this.jakukanteForm.controls['description'].value,
      technics: []
    }
    this.dialogRef.close(this.jakukante);
  }
  onCancelClick(){
    this.dialogRef.close();
  }
}
