import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Keiko } from 'src/app/shared/models/Keiko';

@Component({
  selector: 'app-keiko-edit-dialog',
  templateUrl: './keiko-edit-dialog.component.html',
  styleUrls: ['./keiko-edit-dialog.component.css']
})
export class KeikoEditDialogComponent implements OnInit {

  selectedKeiko?: Keiko;

  constructor(
    public dialogRef: MatDialogRef<KeikoEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA,) public keiko?: Keiko
  ) { }

  ngOnInit(): void {
    this.selectedKeiko = this.keiko;
  }

}
