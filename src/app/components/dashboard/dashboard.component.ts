
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Iaidoka } from 'src/app/shared/models/Iaidoka';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserinfoComponent } from '../userinfo/userinfo.component';
import { UserinfoModule } from '../userinfo/userinfo.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  user?: User;
  iaidoka?: Iaidoka;
  showSidebar = false;

  @ViewChild("drawer")
  drawer!: MatDrawer

  @ViewChild('componentcontainer',  { read: ViewContainerRef })
  componentContainerRef!: ViewContainerRef ;

  selectedOptions?: SelectionModel<MatListOption>;
  profile = "profile";
  menu2 = "menu2";
  login = "login";

  selectedItem: any;

  constructor(
    public authService: AuthService,
    public afdb: AngularFireDatabase,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver) {}

  ngAfterViewInit(): void {
    this.loadUserInfo();
  }

  ngOnInit() {
    
    this.user = this.authService.userData;
  }

  async loadUserInfo() {
    if (this.user){
      const iaidokaRef = this.afdb.database.ref(`iaidoka/${this.user.uid}`); 
      const snap = await iaidokaRef.once('value');
      this.iaidoka = snap.val();
      if (this.iaidoka && (this.iaidoka.ryuha == null)) {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserinfoComponent);
        this.componentContainerRef.clear();
        const componentRef = this.componentContainerRef.createComponent<UserinfoComponent>(componentFactory);
        componentRef.instance.iaidoka = this.iaidoka;
      } else {
        //load to dashboard
      }
    }else {
      this.router.navigate(['/login']);
      window.alert('Please login first');
    }
    
  }

  onMenuitemClicked(event: MatSelectionListChange){
    this.selectedItem = event.options[0].value;
    this.componentContainerRef.clear();
    if (this.selectedItem === "login") {
      this.authService.SignOut();
    } else if (this.selectedItem === "profile"){
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserinfoComponent);
      const componentRef = this.componentContainerRef.createComponent<UserinfoComponent>(componentFactory);
      componentRef.instance.iaidoka = this.iaidoka;
    }   
  }
}
