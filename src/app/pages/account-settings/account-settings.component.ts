import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/Services/shared/setting.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
    
    public links: any[] | NodeListOf<Element> = []; // Definimos asi la propiedad, por el uso estricto de definicion que tiene Angular
    public linkTheme = document.querySelector('#theme');

  constructor(public service: SettingService) { }

  ngOnInit(): void {
    this.service.checkCurrentheme();
  }

  public changeTheme(theme: string){

    this.service.changeTheme(theme);
    this.service.checkCurrentheme();
  }

  
}
