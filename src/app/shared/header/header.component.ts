
import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/Services/entidades/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public imgUrl: string = '';

  constructor(public usuarioService: UsuarioService, private router: Router) { 

    // Esta propiedad, no la usamos porque hacemos referencia en el html al get propio del modelo de nuestro
    // objeto 'usuario' del service
    this.imgUrl = usuarioService.usuario.getImageUrl;
  }

  public logout(){
    this.usuarioService.logout();
  }

  /** Function para buscar terminos globales por los nombres de las entidades*/
  public buscarEntidades( termino: string ) {
    
    // Si no tenemos nada en el termino de busqueda, simplemente returnamos
    if(termino.length === 0) return;
    console.log(termino);

    this.router.navigateByUrl(`/dasboard/busqueda/${ termino }`);
  }
}
