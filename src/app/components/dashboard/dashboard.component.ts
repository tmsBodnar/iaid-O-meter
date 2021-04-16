import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatList, MatListOption, MatSelectionListChange } from '@angular/material/list';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
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

  user?: User;
  iaidoka?: Iaidoka;
  showSidebar = false;

  @ViewChild("drawer")
  drawer?: MatDrawer

  selectedOptions = [];

  profile = "profile";
  menu2 = "menu2";
  login = "login";

  selectedItem: any;

  constructor(
    public authService: AuthService,
    public afdb: AngularFireDatabase,
    private router: Router
  ) { 
  }

  async ngOnInit() {
    this.user = this.authService.userData;
    if (this.user){
    const iaidokaRef = this.afdb.database.ref(`iaidoka/${this.user.uid}`); 
    const snap = await iaidokaRef.once('value');
    this.iaidoka = snap.val();
    if (this.iaidoka && (this.iaidoka.dojo == null || this.iaidoka.sensei == null)) {

    }
    }
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
    this.router.navigate(['/' + this.selectedItem ]);
  }
}
