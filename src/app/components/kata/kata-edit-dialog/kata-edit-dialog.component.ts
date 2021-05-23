import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kata } from 'src/app/shared/models/Kata';

@Component({
  selector: 'app-kata-edit-dialog',
  templateUrl: './kata-edit-dialog.component.html',
  styleUrls: ['./kata-edit-dialog.component.css']
})
export class KataEditDialogComponent implements OnInit {

  dialogHeader= "Add new Kata";
  kataForm: FormGroup;
  selectedKata?: Kata;

  constructor( 
    public dialogRef: MatDialogRef<KataEditDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA,) public kata?: Kata) {
      this.kataForm = this.fb.group({
        'name': [this.kata?.name, Validators.required],
        'description': [this.kata?.description, Validators.required],
        'number': [this.kata?.number, Validators.required],
        'ryuha': [this.kata?.ryuha, Validators.required],
      });
     }

  ngOnInit(): void {
    this.selectedKata = this.kata;
    if(this.selectedKata) {
      this.dialogHeader = "Edit " + this.selectedKata.name;

    }
  }

  onSaveClicked(){
    if(this.selectedKata){
      this.selectedKata.name = this.kataForm.controls['name'].value;
      this.selectedKata.description = this.kataForm.controls['description'].value;
      this.selectedKata.number = this.kataForm.controls['number'].value;
      this.selectedKata.ryuha = this.kataForm.controls['ryuha'].value;
    } else {
      this.selectedKata = {
        name: this.kataForm.controls['name'].value,
        description: this.kataForm.controls['description'].value,
        number: this.kataForm.controls['number'].value,
        ryuha: this.kataForm.controls['ryuha'].value,
        medias: [],
        jakukantes: [],
      }
    }
    this.dialogRef.close(this.selectedKata);
  }

  onCancelClick(){
    this.dialogRef.close();
  }

}