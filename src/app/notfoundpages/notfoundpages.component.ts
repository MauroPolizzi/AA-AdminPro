import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfoundpages',
  templateUrl: './notfoundpages.component.html',
  styleUrls: ['./notfoundpages.component.css']
})
export class NotfoundpagesComponent implements OnInit {

  year: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
