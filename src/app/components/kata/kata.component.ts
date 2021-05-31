import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Iaidoka } from 'src/app/shared/models/Iaidoka';
import { Jakukante } from 'src/app/shared/models/Jakukante';
import { Kata } from 'src/app/shared/models/Kata';
import { Technic } from 'src/app/shared/models/Technic';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { JakukanteEditDialogComponent } from './jakukante-edit-dialog/jakukante-edit-dialog.component';
import { KataEditDialogComponent } from './kata-edit-dialog/kata-edit-dialog.component';

@Component({
  selector: 'app-kata',
  templateUrl: './kata.component.html',
  styleUrls: ['./kata.component.css']
})
export class KataComponent implements OnInit {

  katas: Kata[] =[];
  kata?: Kata;
  jakukantes: Jakukante[] = [];
  technics: Technic[] = [];
  iaidoka?: Iaidoka;
  clickButton = false;

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    this.iaidoka = this.authService.iaidoka;
    this.katas = await this.firebaseService.getAllKatasForUser(this.iaidoka?.uid);
  }

  onPlusKataClicked(){
    const dialogRef = this.dialog.open(KataEditDialogComponent, {
      width: '250px',
      data: this.kata
    });

    dialogRef.afterClosed().subscribe(async result => {
      if(result){
        this.kata = result; 
        await this.firebaseService.saveKata(this.kata!, this.iaidoka!);
      }
    });
  }
  onEditKataClicked(kata: Kata){
    this.kata = kata;
    this.onPlusKataClicked();
  }
  onNewJakukanteClicked(kata: Kata){
    this.kata = kata;
    const dialogRef = this.dialog.open(JakukanteEditDialogComponent, {
      width: '300px',
      data: null
    });

    dialogRef.afterClosed().subscribe(async result => {
      if(result){
        const savedJakukanteUid = await this.firebaseService.saveJakukante(result, this.kata!);
        result.uid = savedJakukanteUid
        this.kata?.jakukantes.push(result);
      }
    });
  }

  onEditJakukanteClicked(jakukante: Jakukante){
    this.clickButton = true;
    console.log(jakukante, "clicked");
  }

  onNewTechnicClicked(){
    
  }

  TrackByJakukanteUid(index: number, jakukante: Jakukante){
    return jakukante.uid;
  }

  TrackByKataUid(index: number, kata: Kata){
    return kata.uid;
  }
  TrackByTechnicUid(index: number, technic: Technic){
    return technic.uid;
  }
}
