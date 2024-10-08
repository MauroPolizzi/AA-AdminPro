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
    
    this.pagina += valor;

    if(this.pagina < 0){
      this.pagina = 0;
    }else if(this.pagina >= this.totalUsuarios){
      this.pagina -= valor;
    }

    this.cargarUsuarios();
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

            // Una vez confirmada la accion de eliminar, volvemos a cargar la lista de usuarios
            this.cargarUsuarios();
          });  
      }
    })
  }

  public cambiarImageUsuario(usuario: UsuarioModel){    
    this.modalImageService.abrirModal('usuarios', usuario.Guid || '', usuario.img);
  }
}
