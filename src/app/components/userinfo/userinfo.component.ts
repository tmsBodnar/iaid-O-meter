import { Component, Input, OnInit } from '@angular/core';
import { Iaidoka } from 'src/app/shared/models/Iaidoka';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  @Input()
  iaidoka?: Iaidoka;

  constructor() { }

  ngOnInit(): void {
  }

}
