import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LoginForm } from 'src/app/interfaces/login-form.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Declaramos las propiedades del token y headers
  public token: string = '';
  public headers: HttpHeaders = new HttpHeaders();
  
  constructor(private http: HttpClient) { 
    
    // Seteamos las props con sus valores correspondientes
    // Ahora cada vez que quieramos hacer una peticion al backend 
    // donde tengamos que mandar el token en los headers,
    // directamente llamamos a la prop de headers de este service
    // Ahora esta centralizado aqui 
    this.token = localStorage.getItem('token') || '';
    this.headers = new HttpHeaders({ 'x-token': this.token });
    //console.log(this.headers);
  }

  public return_client_id() {

    return this.http.get(`${environment.base_url}/login/config`);
  }

  public login(formData: LoginForm){
      
      return this.http.post(`${environment.base_url}/login`, formData)
        .pipe(
          tap( (resp: any) => {
            localStorage.setItem('token', resp.token);
          })
        );
    }
  
}
