import { Component, OnDestroy, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { Subscription, delay } from 'rxjs';

import { UsuarioModel } from 'src/app/models/usuario.model';

import { ModalImageService } from '../../../Services/collectionAndFiles/modal-image.service';
import { UsuarioService } from 'src/app/Services/entidades/usuario/usuario.service';
import { SearchService } from 'src/app/Services/search/search.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  private imgSubida!: Subscription;

  public usuarios:any[] = [];
  public usuariosTemporales:any[] = [];
  public totalUsuarios: number = 0;
  public pagina: number = 0;
  public loader: boolean = true;


  constructor(private usuarioService: UsuarioService, private search: SearchService, private modalImageService: ModalImageService) { }
  
  
  ngOnInit(): void {
    this.cargarUsuarios();
    
    // Estamos atentos al evento, y si se cargo una nueva img, cargamos los usuarios
    // Colocamos un delay para retrasar la carga de usuarios y asi mostrar la img actualizada en la grilla
    this.imgSubida = 
      this.modalImageService.imgSubida.pipe( delay(100) ).subscribe( img => this.cargarUsuarios() );
  }
  
  ngOnDestroy(): void {
    // Eliminamos la suscripcion de la img, para no tener fugas de memoria ni que se cargue dos veces
    this.imgSubida.unsubscribe();
  }

  public cargarUsuarios(){
  
    this.loader = true;
    this.usuarioService.getUsuarios(this.pagina)
      .subscribe( (resp: any) => {
        this.totalUsuarios = resp.total;

        if(resp.usuarioCollection.length !== 0){
          this.usuarios = resp.usuarioCollection
          this.usuariosTemporales = this.usuarios;
          this.loader = false;
        }
      });
  }

  public cambiarPagina( valor: number ){

    // Sumamos el valor que viene desde el template
    this.pagina += valor;
    
    // Verificamos que la pagina nunca sea menor a cero (valor negativo, rompe el servidor)
    if(this.pagina < 0) this.pagina = 0;

    // Al volver atras cuando se tiene la pagina en cero, vuelve a realizar una consulta a la API,
    // esto se podria evitar usando un cache que guarde los datos y evitrar llamadas inecesarias.
    //if(this.pagina === 0) { console.log('Sin mas registros por mostrar');  return; }
    
    // Sabemos que la API devuelve 10 registros por paginado, y en la misma respuesta el total de registros en base de datos
    // En ese caso, no es necesario ejecutar ninguna accion si ya se visualiza el total de los registros 
    if(this.totalUsuarios === this.pagina){ console.log('Sin mas registros por mostrar');  return; }
    
    // Solo si el total de registros supera el valor de pagina, enviamos una solicitud a la API
    if(this.totalUsuarios > this.pagina) this.cargarUsuarios();

    // Si el total de registros es inferior al valor de pagina, solo restamos el valor que viene desde el template a pagina
    if(this.totalUsuarios < this.pagina){
      this.pagina -= valor;
      return;
    }
    
  }

  public buscar(query: string){

    if(query.length === 0){
      return this.usuarios = this.usuariosTemporales;
    }

    this.search.buscar('usuario', query)
      .subscribe( (resp: any) => {
        this.usuarios = resp
      })    
  }

  public actualizarUsuarioGrid(usuario: UsuarioModel){

    this.usuarioService.actualizarUsuarioGrid(usuario)
      .subscribe( resp => console.log(resp) )
  }

  public borrar(usuario: UsuarioModel){
    
    // Aqui evitamos la eliminacion del propio usuario que esta activo en la sesion
    if(usuario.Guid === this.usuarioService.usuario.Guid){
      return Swal.fire({
        text: 'No es posible la eliminacion de su propio usuario',
        icon: 'warning',
      });
    }

    Swal.fire({
      title: 'Eliminar Usuario',
      text: `Deseas eliminar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      
      if (result.isConfirmed) {
        
        this.usuarioService.EliminarUsuario(usuario)
          .subscribe( (resp: any) => {
            Swal.fire({
              title: resp.message,
              icon: 'success',
              text: `Se elimino con exito el usuario: ${usuario.nombre}`
            });

            // Una vez confirmada la accion de eliminar, seteamos la pagina en 0 y volvemos a cargar la lista de usuarios
            this.pagina = 0;
            this.cargarUsuarios();
          });  
      }
    })
  }

  public cambiarImageUsuario(usuario: UsuarioModel){    
    this.modalImageService.abrirModal('usuarios', usuario.Guid || '', usuario.img);
  }
}
