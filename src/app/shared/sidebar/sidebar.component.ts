import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../Services/sidebar.service';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public muenuItem = this.service.menu;

  constructor(private service: SidebarService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {

    //#region Ejemplo simple de trabajo con Promise
    //this.getUser().then( ususarios => console.log(ususarios) );

    // const promesa = new Promise( (result, reject) => {
      
    //   if(false){
    //     reject('salio mal');
    //   }else{
    //     result('Hola  Mundo');
    //   }

    // })

    // promesa
    //   .then( (mensaje) => {
    //     console.log(mensaje);
    //   })
    //   .catch( error => {
    //     console.log('mensaje de error de la promesa: ', error);
    //   });
    //#region 
  }

  public getUser(){

    return new Promise( resolve => {

      fetch('https://reqres.in/api/users')
      .then( resp => resp.json() )
      .then( body => resolve(body.data) )
    });
  }

  public logout(){
    
    this.usuarioService.logout();
  }

}
