import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  hide = true;

  signupForm: FormGroup;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder
  ) { 
    this.signupForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
  }

onSubmitForm(){
  this.authService.SignUp(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.name)
}
}
