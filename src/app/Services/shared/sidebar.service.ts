import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'Progressbar', url: 'progress' },
        { titulo: 'Graficas', url: 'grafica1' },
        { titulo: 'Promesas', url: 'promis' },
        { titulo: 'Rxjs', url: 'rxjs' },
      ]
    },
    
    {
      titulo: 'Entidades',
      icono: 'mdi mdi-human-handsup',
      submenu: [
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Medicos', url: 'medicos' },
        { titulo: 'Hospitales', url: 'hospitales' },
      ]
    }
  ];

  constructor() { }
}
