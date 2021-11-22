import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverallComponent } from './overall.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { KeikoEditDialogComponent } from './keiko-edit-dialog/keiko-edit-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    OverallComponent,
    KeikoEditDialogComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ]
})
export class OverallModule { }
