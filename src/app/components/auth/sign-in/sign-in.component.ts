import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BusyService } from 'src/app/shared/services/busy.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  hide = true;
  clicked = false;

  loginForm: FormGroup;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private busyService: BusyService
  ) { 
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
  }

  async onSubmitForm(){
    this.clicked = true;
    this.busyService.showSpinner();
    await this.authService.SignIn(this.loginForm.value.email, this.loginForm.value.password);
    this.busyService.hideSpinner();
  }

}
