import { Component, OnInit } from '@angular/core';
import { Iaidoka } from 'src/app/shared/models/Iaidoka';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  iaidoka?: Iaidoka;

  constructor(
    public authService: AuthService
  ) { 
    this.user = authService.userData;
  }

  ngOnInit(): void {
  }

}
