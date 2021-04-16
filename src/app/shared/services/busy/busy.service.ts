import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busy = false;

  constructor() { }

  showSpinner(){
    this.busy = true;
  }
  hideSpinner(){
    this.busy = false;
  }
}

