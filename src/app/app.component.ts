import { Component } from '@angular/core';
import { BusyService } from './shared/services/busy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iaid-O-meter';

  constructor(public busyService: BusyService){
  }
}
