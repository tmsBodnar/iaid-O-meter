import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KataComponent } from './kata.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { KataEditDialogComponent } from './kata-edit-dialog/kata-edit-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import { JakukanteEditDialogComponent } from './jakukante-edit-dialog/jakukante-edit-dialog.component';



@NgModule({
  declarations: [
    KataComponent,
    KataEditDialogComponent,
    JakukanteEditDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule
  ]
})
export class KataModule { }
