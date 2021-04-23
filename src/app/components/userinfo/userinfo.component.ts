import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Iaidoka } from 'src/app/shared/models/Iaidoka';
import { Ryuha } from 'src/app/shared/models/Ryuha';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  @Input()
  iaidoka?: Iaidoka;

  ryuha?: Ryuha;

  nameDisabled = true;
  emailDisabled = true;
  ryuhaDisabled = true;

  clicked = false;

  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      'name': [ this.iaidoka?.name, Validators.compose([Validators.required])],
      'email': [ this.iaidoka?.email, Validators.compose([Validators.required, Validators.email])],
      'ryuha' : [ this.ryuha?.name, Validators.compose([Validators.required])]
    });
   }

  ngOnInit(): void {
    this.ryuha = this.iaidoka?.ryuha;
    this.userForm.controls['name'].setValue(this.iaidoka?.name);
    this.userForm.controls['email'].setValue(this.iaidoka?.email);
    this.userForm.controls['ryuha'].setValue(this.iaidoka?.ryuha?.name);
  }

  onFormSubmit(){
    this.ryuha = {
      name:  this.userForm.controls['ryuha'].value
    }
    this.iaidoka!.name = this.userForm.controls['name'].value,
    this.iaidoka!.email = this.userForm.controls['email'].value,
    this.iaidoka!.ryuha = this.ryuha
    this.clicked = true;
    console.log(this.iaidoka);
  }

  onCancelClicked(){
    this.router.navigate(['dashboard']);
  }

}
