import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KataComponent } from './kata.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { KataEditDialogComponent } from './kata-edit-dialog/kata-edit-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';



@NgModule({
  declarations: [
    KataComponent,
    KataEditDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule
  ]
})
export class KataModule { }
