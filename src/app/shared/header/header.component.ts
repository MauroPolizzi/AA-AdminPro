import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private usuarioService: UsuarioService) { }

  public logout(){
    this.usuarioService.logout();
  }
}
