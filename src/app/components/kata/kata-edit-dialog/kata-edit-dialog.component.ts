import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kata } from 'src/app/shared/models/Kata';

@Component({
  selector: 'app-kata-edit-dialog',
  templateUrl: './kata-edit-dialog.component.html',
  styleUrls: ['./kata-edit-dialog.component.css']
})
export class KataEditDialogComponent implements OnInit {

  dialogHeader= "add new Kata";

  constructor( public dialogRef: MatDialogRef<KataEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public kata: Kata) { }

  ngOnInit(): void {
    if(this.kata) {
      this.dialogHeader = "Edit " + this.kata.name;
    }
  }

  onCancelClick(){
    this.dialogRef.close();
  }

}