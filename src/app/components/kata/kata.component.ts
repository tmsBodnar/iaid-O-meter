import { Component, OnInit } from '@angular/core';
import { Kata } from 'src/app/shared/models/Kata';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';

@Component({
  selector: 'app-kata',
  templateUrl: './kata.component.html',
  styleUrls: ['./kata.component.css']
})
export class KataComponent implements OnInit {

  katas: Kata[] =[];

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.katas = await this.firebaseService.getAllKatasForUser(this.authService.iaidoka?.uid);
    console.log(this.katas);
  }

  onPlusKataClicked(){
    console.log("clicked");
  }
}
