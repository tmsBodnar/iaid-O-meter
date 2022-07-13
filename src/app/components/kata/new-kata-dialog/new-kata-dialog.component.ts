import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Note } from 'src/app/shared/models/Note';
import { Kata } from 'src/app/shared/models/Kata';
import { Ryuha } from 'src/app/shared/models/Ryuha';

@Component({
  selector: 'app-new-kata-dialog',
  templateUrl: './new-kata-dialog.component.html',
  styleUrls: ['./new-kata-dialog.component.css'],
})
export class NewKataDialogComponent implements OnInit {
  dialogHeader = 'Add new Kata';
  kataForm: FormGroup;
  ryuhas: Ryuha[] = [];
  kata?: Kata;

  constructor(
    public dialogRef: MatDialogRef<NewKataDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { ryuhasData: Ryuha[]; kata: Kata }
  ) {
    this.ryuhas = data.ryuhasData;
    this.kata = data.kata;
    this.kataForm = this.fb.group({
      name: [this.kata?.name, Validators.required],
      description: [this.kata?.description, Validators.required],
      number: [this.kata?.number, Validators.required],
      ryuha: [
        this.ryuhas.find((r) => r.name === this.kata?.ryuha.name),
        Validators.required,
      ],
    });
  }

  ngOnInit(): void {}

  onSaveClicked() {
    const kata = {
      uid: this.kata?.uid,
      name: this.kataForm.controls['name'].value,
      description: this.kataForm.controls['description'].value,
      number: this.kataForm.controls['number'].value,
      ryuha: this.kataForm.controls['ryuha'].value,
      medias: [],
      notes: [],
    };
    this.dialogRef.close({ kata: kata, delete: false });
  }

  onRemoveClicked() {
    this.dialogRef.close({ kata: this.kata, delete: true });
  }

  onCancelClicked() {
    this.dialogRef.close();
  }

  // onDeleteClicked() {
  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     width: '250px',
  //     data: this.selectedKata?.name,
  //   });
  //   dialogRef.afterClosed().subscribe(async (result) => {
  //     console.log('1', result);
  //     if (!result) {
  //       console.log(result);
  //       this.dialogRef.close();
  //     } else {
  //       console.log(result);
  //       this.selectedKata = undefined;
  //       this.dialogRef.close(this.selectedKata);
  //     }
  //   });
  // }
}
