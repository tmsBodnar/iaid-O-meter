import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  resetForm: FormGroup;
  sent = false;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.resetForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])]
    });
   }

  ngOnInit(): void {
  }

  onSubmitForm(){
    this.authService.ForgotPassword(this.resetForm.value.email);
    this.sent = true;
  }

}
