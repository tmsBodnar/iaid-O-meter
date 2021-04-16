import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatList, MatListOption, MatSelectionListChange } from '@angular/material/list';
import { MatDrawer } from '@angular/material/sidenav';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Iaidoka } from 'src/app/shared/models/Iaidoka';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  iaidoka?: Iaidoka;
  showSidebar = false;

  @ViewChild("drawer")
  drawer?: MatDrawer

  selectedOptions = [];

  profil = "profil";
  menu2 = "menu2";
  logout = "logout";

  selectedItem: any;

  constructor(
    public authService: AuthService,
    public afdb: AngularFireDatabase,
  ) { 
    this.user = authService.userData;
    
  //  this.iaidoka = this.afdb.database.ref(`iaidoka/${this.user.uid}`);
  }

  ngOnInit(): void {
  }

  menuClicked() {
  }
  onMenuitemClicked(event: MatSelectionListChange){
    this.selectedItem = event.options[0].value;
    console.log(this.selectedItem);
    this.drawer?.toggle();
    if (this.selectedItem === "logout") {
      this.authService.SignOut();
    }
  }
}
