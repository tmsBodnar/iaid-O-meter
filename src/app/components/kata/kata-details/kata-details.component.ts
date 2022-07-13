import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Kata } from 'src/app/shared/models/Kata';
import { Ryuha } from 'src/app/shared/models/Ryuha';

@Component({
  selector: 'app-kata-details',
  templateUrl: './kata-details.component.html',
  styleUrls: ['./kata-details.component.css'],
})
export class KataDetailsComponent implements OnInit {
  kata: Kata;
  ryuhas: Ryuha[] = [];
  detailsForm: FormGroup;
  selectedRyuha: Ryuha;

  constructor(
    public dialogRef: MatDialogRef<KataDetailsComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      selectedKata: Kata;
      ryuhasData: Ryuha[];
      selectedRyuha: Ryuha;
    }
  ) {
    this.kata = data.selectedKata;
    this.ryuhas = data.ryuhasData;
    this.selectedRyuha = data.selectedRyuha;
    console.log(this.kata, this.ryuhas, this.selectedRyuha);
    this.detailsForm = this.fb.group({
      name: [this.kata?.name, Validators.required],
      description: [this.kata?.description, Validators.required],
      number: [this.kata?.number, Validators.required],
      ryuhaControl: [this.selectedRyuha, Validators.required],
    });
  }

  ngOnInit(): void {}

  onSaveClicked() {
    this.kata = {
      name: this.detailsForm.controls['name'].value,
      description: this.detailsForm.controls['description'].value,
      number: this.detailsForm.controls['number'].value,
      ryuha: this.detailsForm.controls['ryuhaControl'].value,
      medias: [],
      notes: [],
    };
    this.dialogRef.close(this.kata);
  }

  onCancelClicked() {
    this.dialogRef.close();
  }
}
