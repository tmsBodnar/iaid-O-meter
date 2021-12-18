import { Component, ComponentRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Generalcomponent } from 'src/app/shared/generics/generalcomponent';
import { Iaidoka } from 'src/app/shared/models/Iaidoka';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit, Generalcomponent{

  @Input()
  iaidoka?: Iaidoka;

  @Output()
  cancel = new Subject<boolean>();

  nameDisabled = true;
  emailDisabled = true;

  clicked = false;

  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService
  ) {
    this.userForm = this.formBuilder.group({
      'name': [ this.iaidoka?.name, Validators.compose([Validators.required])],
      'email': [ this.iaidoka?.email, Validators.compose([Validators.required, Validators.email])],
    });
   }

  async ngOnInit(){
    this.userForm.controls['name'].setValue(this.iaidoka?.name);
    this.userForm.controls['email'].setValue(this.iaidoka?.email);
  }

  async onFormSubmit(){
    const email = 
      this.iaidoka!.email !==  this.userForm.controls['email'].value ?
      this.userForm.controls['email'].value :
      this.iaidoka!.email;
    const iaidokaName = 
      this.iaidoka!.name !== this.userForm.controls['name'].value ?
      this.userForm.controls['name'].value :
      this.iaidoka!.name;
    this.iaidoka!.name = iaidokaName
    this.iaidoka!.email = email
    this.clicked = true;
    await this.firebaseService.updateIaidoka(this.iaidoka!);
  }
}
