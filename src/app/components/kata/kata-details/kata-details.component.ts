import { Component, Input, OnInit } from '@angular/core';
import { Kata } from 'src/app/shared/models/Kata';

@Component({
  selector: 'app-kata-details',
  templateUrl: './kata-details.component.html',
  styleUrls: ['./kata-details.component.css'],
})
export class KataDetailsComponent implements OnInit {
  @Input()
  kata?: Kata;

  constructor() {}

  ngOnInit(): void {}
}
