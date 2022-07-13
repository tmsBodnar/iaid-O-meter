import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KataComponent } from './kata.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NewKataDialogComponent } from './new-kata-dialog/new-kata-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { KataDetailsComponent } from './kata-details/kata-details.component';

@NgModule({
  declarations: [KataComponent, NewKataDialogComponent, KataDetailsComponent],
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
    MatListModule,
    MatSelectModule,
  ],
})
export class KataModule {}
