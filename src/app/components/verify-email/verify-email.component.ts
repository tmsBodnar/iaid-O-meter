import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  user: User;
  resent = false;

  constructor(
    public authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.user = this.authService.userData;
   }

  ngOnInit(): void {
  }

  async onResendClicked(){
    try {
      await this.authService.SendVerificationMail();
      this.resent = true;
      this.snackBar.open('Verification email sent');
    } catch (error) {
      this.snackBar.open(error.message);
    }
  }

}
