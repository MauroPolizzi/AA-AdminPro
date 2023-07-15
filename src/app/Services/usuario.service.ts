import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

declare const google: any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  constructor( private http: HttpClient, 
               private router: Router,
               private ngZone: NgZone ) { }
  
  public crearUsuario(formData: RegisterForm ){
    
    return this.http.post(`${base_url}/usuario`, formData);
  }

  public logout(){
    
    localStorage.removeItem('token'); 
    
    if (localStorage.getItem('emailGoogle')) {
      google.accounts.id.revoke(localStorage.getItem('emailGoogle'), () => {
        localStorage.removeItem('emailGoogle');
    
        // Trabajamos con el NgZone porque es una recomendacion de Angular,
        // Ya que estamos ejecutando un codigo propio de Angular desde una function
        // de libreria de terceros.
        // Por eso el warnning en consola
        this.ngZone.run( () => {
          this.router.navigateByUrl('/login');
        })
      });
    
    }else{
      localStorage.removeItem('email');
      this.router.navigateByUrl('/login');
    }

    // Vemos las propiedades que nos trae la constante global de google
    //console.log(google);
  }

  public login(formData: LoginForm){
    
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  public loginGoogle( token: string ){
    
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap( (resp: any) => {
          // Grabamos el token y el email de la respuesta que nos devuelve nuestro backend
          //console.log(resp);
          localStorage.setItem('emailGoogle', resp.userAuth.email);
          localStorage.setItem('token', resp.tokenServer);
        })
      );
  }

  public verificarToken(): Observable<boolean>{

    // Obtenemos el token desde el localStorage, esto puede venir undefaind o null
    // si es asi, solo devolvemos un string vacio
    const token = localStorage.getItem('token') || '';

    // Llamamos al endpoint para renovar el token, y le pasamos el token
    // que obtuvimos anteriormente del localStorage
    // En los headers, le mandamos el encabezado de 'x-token', que asi lo definimos 
    // en nuestro backend
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        // Guardamos el nuevo token que nos devuelve la respuesta (asi lo definimos en nuestro backend)
        localStorage.setItem('token', resp.newToken);
      }),
      // Devolvemos un true si salio todo ok
      map( resp => true ),
      // Manejamos el error a traves del catch, y con el operador of,
      // devolvemos un nuevo Observable del tipo que pasemos por parametro
      catchError( error => of(false) ) 
    )
  }
}
