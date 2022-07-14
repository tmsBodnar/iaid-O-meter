import { Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Iaidoka } from 'src/app/shared/models/Iaidoka';
import { Note } from 'src/app/shared/models/Note';
import { Kata } from 'src/app/shared/models/Kata';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { NewKataDialogComponent } from './new-kata-dialog/new-kata-dialog.component';
import { Ryuha } from 'src/app/shared/models/Ryuha';
import { KataDetailsComponent } from './kata-details/kata-details.component';
// import { DashboardService } from 'src/app/shared/services/dashboard/dashboard.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

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
  selectedRyuha?: Ryuha;
  indexExpanded = -1;

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    public dialog: MatDialog,
    private dashboard: DashboardComponent
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

  onPlusKataClicked(kata?: Kata) {
    const dialogRef = this.dialog.open(NewKataDialogComponent, {
      width: '500px',
      data: { ryuhasData: this.ryuhas, kata: kata },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result != undefined) {
        if (result.kata !== undefined) {
          if (result.delete) {
            await this.firebaseService.deleteKata(result.kata, this.iaidoka!);
            this.updateDatas();
          } else {
            this.kata = result;
            const notes = this.kata!.notes;
            this.kata!.notes = [];
            await this.firebaseService.saveKata(
              this.kata!,
              this.iaidoka!,
              notes
            );
            this.kata!.notes = await this.firebaseService.getNotesForKata(
              this.kata!.uid!
            );
            this.updateDatas();
            this.selectedRyuha = this.ryuhas.find(
              (r) => r.name === this.kata?.ryuha.name
            );
            this.indexExpanded = this.ryuhas.indexOf(this.selectedRyuha!);
          }
        }
      }
    });
  }
  onKataNotesEdit(kata: Kata) {
    const componentRef = this.dashboard.loadComponent(KataDetailsComponent);
    componentRef.instance.kata = kata;
  }

  setSelectedRyuha(index: number) {
    this.selectedRyuha = this.ryuhas[index];
  }
}
