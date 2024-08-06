import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/Services/entidades/usuario/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public imgUrl: string = '';

  constructor(public usuarioService: UsuarioService) { 

    // Esta propiedad, no la usamos porque hacemos referencia en el html al get propio del modelo de nuestro
    // objeto 'usuario' del service
    this.imgUrl = usuarioService.usuario.getImageUrl;
  }

  public logout(){
    this.usuarioService.logout();
  }
}
