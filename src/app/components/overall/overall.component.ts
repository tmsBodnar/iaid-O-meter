import { AfterContentInit,  ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Keiko } from 'src/app/shared/models/Keiko';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { KeikoEditDialogComponent } from './keiko-edit-dialog/keiko-edit-dialog.component';

@Component({
  selector: 'app-overall',
  templateUrl: './overall.component.html',
  styleUrls: ['./overall.component.css']
})
export class OverallComponent implements OnInit, AfterContentInit {

  eventDate?: Date;
  selectedDate: Date = new Date();
  keikos: Keiko[] = [];
  selectedKeiko?: any;
  
  constructor(
    private ref: ChangeDetectorRef,
    private firebaseService: FirebaseService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
   }
  ngAfterContentInit(): void {
    this.ref.detectChanges();
  }

  async ngOnInit(){
    this.keikos = await this.firebaseService.getAllKeikoForIaidoka(this.authService.iaidoka?.uid);
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      this.keikos.forEach(element => {
        if (date.getDate() === element.date?.getDate()) {
          console.log(element.date?.getFullYear(), element.date?.getMonth(), element.date?.getDate());
          return 'event-style';
        } else {
          return '';
        }
      });
      return '';
    }
  }
  async onSelect(event: any) {
    console.log(event);
    this.selectedDate = event;
    await this.onDateClicked(this.selectedDate);
    // const dateString = event.toDateString();
    // const dateValue = dateString.split(' ');
    // const year = dateValue[3];
    // const DayAndDate = dateValue[0] + ',' + ' ' + dateValue[1] + ' ' + dateValue[2];
    // console.log(year, DayAndDate);
  }

  private async onDateClicked(date: Date){
    this.selectedKeiko = this.keikos.filter(k => k.date === date);
    if (this.selectedKeiko.length > 0 ) {
      // select wicht keiko on that date
    } else {
      this.openDialog(this.selectedKeiko);
    }
  }

  openDialog(keiko: Keiko){
    const dialogRef = this.dialog.open(KeikoEditDialogComponent, {
      width: '250px',
      data: keiko
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.selectedKeiko = result; 
      await this.firebaseService.saveKeiko(this.selectedKeiko!, this.authService.iaidoka!);
      this.keikos = await this.firebaseService.getAllKeikoForIaidoka(this.authService.iaidoka?.uid);
    });
  }
}