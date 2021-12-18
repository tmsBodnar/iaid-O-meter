
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, Inject, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
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

  @ViewChild("menuitems")
  menuitems?: MatSelectionList;

  options: String[] = ["Home", "Kata", "User", "Logout"];

  selectedItem: any;
  selectedComponent: any;

  constructor(
    public authService: AuthService,
    public afdb: AngularFireDatabase,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private ref: ChangeDetectorRef,
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data?: Iaidoka
    ) {}

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
        this.selectedComponent = "Home";
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
  
  navigateBySelected(selectedItem: any) {
    let componentRef = null;
    switch (selectedItem) {
      case "Logout":
        this.confirmLogout();
        break;
      case "Home":
        this.selectedComponent = selectedItem;
        componentRef = this.loadComponent(OverallComponent);
        break;
      case "Kata":
        this.selectedComponent = selectedItem;
        componentRef = this.loadComponent(KataComponent);
        break;
      case "User":
        this.selectedComponent = selectedItem;
        componentRef = this.loadComponent(UserinfoComponent);
        componentRef.instance.iaidoka = this.iaidoka;      
    }
  }
  
  loadComponent(component: Type<Generalcomponent>): any {
    this.componentContainerRef?.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    return this.componentContainerRef?.createComponent<Component>(componentFactory);
  }

   private confirmLogout(){
     console.log(this.selectedItem);
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: this.authService.iaidoka?.name
    });
    this.dialogRef.afterClosed().subscribe(async result => {
      if(result){
        this.authService.SignOut();
      } else {
        this.menuitems?.selectedOptions.toggle(this.selectedComponent);
        this.selectedItem = this.selectedComponent;
        this.navigateBySelected(this.selectedComponent);
      }
    });
  } 
}

