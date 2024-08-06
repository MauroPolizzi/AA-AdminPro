import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Declaramos las propiedades del token y headers
  public token: string = '';
  public headers: HttpHeaders = new HttpHeaders();
  
  constructor() { 
    
    // Seteamos las props con sus valores correspondientes
    // Ahora cada vez que quieramos hacer una peticion al backend 
    // donde tengamos que mandar el token en los headers,
    // directamente llamamos a la prop de headers de este service
    // Ahora esta centralizado aqui 
    this.token = localStorage.getItem('token') || '';
    this.headers = new HttpHeaders({ 'x-token': this.token });
    //console.log(this.headers);
  }
  
}
