import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Jakukante } from 'src/app/shared/models/Jakukante';
import { Kata } from 'src/app/shared/models/Kata';
import { JakukanteEditDialogComponent } from '../jakukante-edit-dialog/jakukante-edit-dialog.component';

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
    public dialog: MatDialog,
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
        kihons: [],
      }
    }
    this.dialogRef.close(this.selectedKata);
  }

  onCancelClicked(){
    this.dialogRef.close();
  }

  onDeleteClicked(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: this.selectedKata?.name
    });
    dialogRef.afterClosed().subscribe(async result => {
      console.log("1", result);
      if(!result){
        console.log(result);
        this.dialogRef.close();
      }
      else {
        console.log(result);
        this.selectedKata = undefined;
        this.dialogRef.close(this.selectedKata);
      }
    });
  }

  onNewJakukanteClicked(){
    this.openJakukanteEditDialog(null)
  }

  onEditJakukanteClicked(jakukante: Jakukante){
    this.openJakukanteEditDialog(jakukante);
    
  }
  private openJakukanteEditDialog(jakukante: Jakukante | null){
    const dialogRef = this.dialog.open(JakukanteEditDialogComponent, {
      width: '400px',
      data: jakukante
    });

    dialogRef.afterClosed().subscribe(async result => {
      if(result){
        this.selectedKata?.jakukantes.push(result);
      }
    });
  }

}