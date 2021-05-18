import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Kata } from 'src/app/shared/models/Kata';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { KataEditDialogComponent } from './kata-edit-dialog/kata-edit-dialog.component';

@Component({
  selector: 'app-kata',
  templateUrl: './kata.component.html',
  styleUrls: ['./kata.component.css']
})
export class KataComponent implements OnInit {

  katas: Kata[] =[];
  kata?: Kata;

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    this.katas = await this.firebaseService.getAllKatasForUser(this.authService.iaidoka?.uid);
  }

  onPlusKataClicked(){
    const dialogRef = this.dialog.open(KataEditDialogComponent, {
      width: '250px',
      data: this.kata
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.kata = result; 
      await this.firebaseService.saveKata(this.kata!, this.authService.iaidoka!);
      this.katas = await this.firebaseService.getAllKatasForUser(this.authService.iaidoka?.uid);
    });
  }
}