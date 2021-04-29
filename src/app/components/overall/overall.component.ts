import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'app-overall',
  templateUrl: './overall.component.html',
  styleUrls: ['./overall.component.css']
})
export class OverallComponent implements OnInit, AfterContentInit {

  eventDate?: Date;
  
  constructor(
    private ref: ChangeDetectorRef
  ) {
   }
  ngAfterContentInit(): void {
    this.ref.detectChanges();
  }

  ngOnInit(): void {
    this.eventDate = new Date();
    this.eventDate.setDate(1);
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      if (date.getDate() === this.eventDate?.getDate()) {
        console.log(this.eventDate?.getFullYear(), this.eventDate?.getMonth(), this.eventDate?.getDate());
        return 'event-style';
      } else {
        return '';
      }
    };
  }

}
