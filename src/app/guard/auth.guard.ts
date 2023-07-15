import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UsuarioService } from '../Services/usuario.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    // Llamamos a nuestro servicio y verificamos el token
    // Si esta todo ok, nos permite ver la pagina de '/dashboard',
    // de lo contrario nos devuelve al login 
    return this.usuarioService.verificarToken()
      .pipe(
        tap( respOk => {
          if (!respOk) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }
  
}
