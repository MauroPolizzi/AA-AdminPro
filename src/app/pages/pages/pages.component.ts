import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/Services/setting.service';

// Esta funcion esta construida en un archivo global de la aplicacion (assets/js/custom.js)
// La declaramos aqui porque al querer usarla a pesar de que esta de manaera global nos da un error
declare function customInitFunction():any; 

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  year: number = new Date().getFullYear();

  constructor(private service: SettingService) {}

  ngOnInit(): void {
      customInitFunction();
  }

}
