import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Iaidoka } from 'src/app/shared/models/Iaidoka';
import { Note } from 'src/app/shared/models/Note';
import { Kata } from 'src/app/shared/models/Kata';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { KataEditDialogComponent } from './kata-edit-dialog/kata-edit-dialog.component';
import { Ryuha } from 'src/app/shared/models/Ryuha';

@Component({
  selector: 'app-kata',
  templateUrl: './kata.component.html',
  styleUrls: ['./kata.component.css'],
})
export class KataComponent implements OnInit {
  katas: Kata[] = [];
  ryuhas: Ryuha[] = [];
  kata?: Kata;
  notes: Note[] = [];
  iaidoka?: Iaidoka;
  clickButton = false;
  selectedKatas: Kata[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    public dialog: MatDialog,
    private ref: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.iaidoka = this.authService.iaidoka;
    this.updateDatas();
  }
  private async updateDatas() {
    this.ryuhas = await this.firebaseService.getRyuhasForUser(
      this.iaidoka?.uid
    );
    for (let i = 0; i < this.ryuhas.length; i++) {
      const katasOfRyuha: Kata[] = await this.firebaseService.getkatasForRyuha(
        this.ryuhas[i].uid
      );
      this.ryuhas[i].katas = katasOfRyuha;
    }
  }

  onPlusKataClicked() {
    const dialogRef = this.dialog.open(KataEditDialogComponent, {
      width: '500px',
      data: this.ryuhas,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result != undefined) {
        this.kata = result;
        const notes = this.kata!.notes;
        this.kata!.notes = [];
        await this.firebaseService.saveKata(this.kata!, this.iaidoka!, notes);
        this.kata!.notes = await this.firebaseService.getNotesForKata(
          this.kata!.uid!
        );
      }
      this.updateDatas();
    });
  }
  TrackByRyuhaUid(index: number, ryuha: Ryuha) {
    return ryuha.uid;
  }
  selectedKataChanged(event: any) {
    console.log(event);
    console.log(this.selectedKatas[0]);
  }
}
