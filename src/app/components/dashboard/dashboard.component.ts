
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Generalcomponent } from 'src/app/shared/generics/generalcomponent';
import { Iaidoka } from 'src/app/shared/models/Iaidoka';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { KataComponent } from '../kata/kata.component';
import { OverallComponent } from '../overall/overall.component';
import { UserinfoComponent } from '../userinfo/userinfo.component';

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
  drawer?: MatDrawer

  @ViewChild('componentcontainer',  { read: ViewContainerRef })
  componentContainerRef?: ViewContainerRef ;

  selectedOptions?: SelectionModel<MatListOption>;
  home = "home";
  kata = "kata"
  logout = "logout";

  selectedItem: any;

  constructor(
    public authService: AuthService,
    public afdb: AngularFireDatabase,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private ref: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.ref.detectChanges();
  }


  async ngOnInit() {
     await this.loadUserInfo();  
  }

  async loadUserInfo() {
    await setTimeout(() => {
      if (this.drawer?.opened) {
        this.drawer.toggle();
      }
      this.iaidoka = this.authService.iaidoka;
      if (this.iaidoka) {
        let componentRef = null;
        componentRef = this.loadComponent(OverallComponent);
      }else {
        this.router.navigate(['/login']);
        window.alert('Please login first');
      }
    }, 100);
  }

  onMenuitemClicked(event: MatSelectionListChange){
    this.selectedItem = event.options[0].value;
    this.navigateBySelected(this.selectedItem);
  }

  onAccountClicked(){
    let componentRef = null;
    componentRef = this.loadComponent(UserinfoComponent);
    componentRef.instance.iaidoka = this.iaidoka;      
    componentRef.instance.cancel.subscribe( (c: boolean) => {
      if (c) {
        this.navigateBySelected(this.selectedItem);
      }
    });
  }
  
  navigateBySelected(selectedItem: any) {
    let componentRef = null;
    switch (selectedItem) {
      case "logout":
        this.authService.SignOut();
        break;
      case "home":
        componentRef = this.loadComponent(OverallComponent);
        break;
      case "kata":
        componentRef = this.loadComponent(KataComponent);
        break;
    }
  }
  
  loadComponent(component: Type<Generalcomponent>): any {
    this.componentContainerRef?.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    return this.componentContainerRef?.createComponent<Component>(componentFactory);
  }
}
