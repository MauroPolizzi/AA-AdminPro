import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';

// Services
import { AuthService } from '../../auth/auth.service';

// Interfacess
import { RegisterForm } from '../../../interfaces/register-form.interface';
import { LoginForm } from '../../../interfaces/login-form.interface';
import { MyProfileForm } from '../../../interfaces/myProfile-form.interface';

// Modelos
import { UsuarioModel } from '../../../models/usuario.model';


declare const google: any;
const base_url = environment.base_url;
//const token = localStorage.getItem('token') || '';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public usuario: UsuarioModel = new UsuarioModel('', '', '', '', '', false, '');

  constructor( private http: HttpClient, 
               private router: Router,
               private ngZone: NgZone,
               private authService: AuthService ) 
  { }

  public getUsuarios(pagina: number){

    return this.http.get(`${base_url}/usuario?pagina=${pagina}`, { headers: this.authService.headers })
      .pipe(
        map( (resp: any) => {
          const usuarios = resp.usuarioCollection.map(
            (user: UsuarioModel) => 
              new UsuarioModel(user.nombre, user.email, user.Guid, '', user.role, user.google, user.img)
          );

          return {
            total: resp.total,
            usuarioCollection: usuarios
          };
        })
      );
  }

  public crearUsuario(formData: RegisterForm ){
    
    return this.http.post(`${base_url}/usuario`, formData);
  }

  public actualizarUsuario(formData: MyProfileForm){

    return this.http.put(`${base_url}/usuario/${this.usuario.Guid}`, formData, {
      headers: this.authService.headers
    })
      .subscribe( async (resp: any) => {
        
        await Swal.fire({
          title: 'Usuario Modificado',
          icon: 'success',
        });

        // Actualizamos los campos en la aplicacion,
        // ya que en js los objetos son pasados por referencia, y en donde lo usamos,
        // que es en 'headres' y 'sidebar', estos componentes sacan la info del obj del
        // servicio, y al confirmar la alerta, actualiza
        if(resp.ok){
          this.usuario.nombre = formData.nombre;
          this.usuario.email = formData.email;
        }

      }, ( err ) => {

        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: err.error.message
        });
      });
  }

  public EliminarUsuario(usuario: UsuarioModel){
    
    // Llamamos simplemente al end-point, y realizamos la suscripcion del lado del component
    return this.http.delete(`${base_url}/usuario/${usuario.Guid}`, { headers: this.authService.headers });
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

  public actualizarUsuarioGrid(usuario: UsuarioModel){

    return this.http.put<UsuarioModel>(`${base_url}/usuario/${usuario.Guid}`, usuario, { headers: this.authService.headers });
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
      headers: {'x-token': token}
    }).pipe(
      tap( (resp: any) => {
        // Desestructuramos el obj usuario de la resp
        const{nombre, email, role, google, img, Guid} = resp.usuario;
        // Creamos una nueva instancia con los datos desestructurados
        this.usuario = new UsuarioModel(nombre, email, Guid, '', role, google, img); 
        
        // Guardamos el nuevo token que nos devuelve la respuesta (asi lo definimos en nuestro backend)
        localStorage.setItem('token', resp.newToken);
      }),
      // Devolvemos un true si salio todo ok
      map( resp => true ),
      // Manejamos el error a traves del catch, y con el operador of,
      // devolvemos un nuevo Observable del tipo que pasemos por parametro
      catchError( error => { console.log(error); return of(false) } ) 
    )
  }
}
