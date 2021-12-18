import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Iaidoka } from 'src/app/shared/models/Iaidoka';
import { Jakukante } from 'src/app/shared/models/Jakukante';
import { Kata } from 'src/app/shared/models/Kata';
import { Kihon } from 'src/app/shared/models/Kihon';
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
  jakukantes: Jakukante[] = [];
  selectedJakukantes: Jakukante[] = [];
  selectedJakukante = this.selectedJakukantes[0];
  technics: Kihon[] = [];
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
    console.log(this.katas);
    const dialogRef = this.dialog.open(KataEditDialogComponent, {
      width: '500px',
      data: this.kata
    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log("2",this.katas);
      if(result != undefined){
        this.kata = result; 
        const jakukantes = this.kata!.jakukantes;
        this.kata!.jakukantes = [];
        await this.firebaseService.saveKata(this.kata!, this.iaidoka!, jakukantes);
        this.kata!.jakukantes = await this.firebaseService.getJakukanteForKata(this.kata!.uid!);
        console.log("3",this.katas);
      } else if (result === undefined) {
        await this.firebaseService.deleteKata(this.kata!, this.iaidoka!);
      } else {

      }
    });
  }
  onEditKataClicked(kata: Kata){
    this.kata = kata;
    this.onPlusKataClicked();
  }

  TrackByJakukanteUid(index: number, jakukante: Jakukante){
    return jakukante.uid;
  }

  TrackByKataUid(index: number, kata: Kata){
    return kata.uid;
  }
  TrackByKihonUid(index: number, technic: Kihon){
    return technic.uid;
  }
}
