import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from 'src/app/Services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  // Usamos esta referencia para el boton de google, 
  // es mejor opcion para manejarlo con Angular
  // En el html lo colocamos con un #
  @ViewChild('googleBtn') googleBtn: ElementRef | undefined;
  
  // Variable para saber si el formulario se intento mandar
  public formSubmit: boolean = false;
  public formLogin: FormGroup = new FormGroup({});

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private ngZone: NgZone) { 
    
    // Password: 121212
    this.formLogin = new FormGroup({
      email: new FormControl(localStorage.getItem('email') || '', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      remember: new FormControl(false)
    });
  }

  // Renderizamos nuestro boton de google, cuando la aplicacion 
  // haya cargado primero
  ngAfterViewInit(): void {
    this.googleInit();
  }

  public campoNoValido(): boolean{

    if ((this.formLogin.get('email')?.invalid || this.formLogin.get('password')?.invalid) 
        && this.formSubmit) {
      return true;
    }else{
      return false;
    }
  }

  public login(){
    
    this.formSubmit = true;

    this.usuarioService.login(this.formLogin.value)
      .subscribe( resp => {
      
        console.log(resp);
        this.router.navigateByUrl('/');

        if (this.formLogin.get('remember')?.value) {
          localStorage.setItem('email', this.formLogin.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }
      
      }, (err) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: err.message
        });

      } );    
  }

  public register(){
    this.router.navigateByUrl('register');
  }

  // El contenido de esta function fue sacado de la implementacion del boton de google de la parte
  // del backend, que fue en el directorio 'public/index.html'
  private googleInit(){
    google.accounts.id.initialize({
      client_id: "459567625014-odk90d389jnsurk8s89p1ls833srcc29.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn?.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  // Llamamos al metodo de autenticacion de google, y comparamos con el token que se guardo en localStorage
  // y dejamos pasar al '/dashboard'
  private handleCredentialResponse(response: any){
    //console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential)
      .subscribe( (resp: any) => {
        if (resp.tokenServer === localStorage.getItem('token')) {
          
          // Trabajamos con el NgZone porque es una recomendacion de Angular,
          // Ya que estamos ejecutando un codigo propio de Angular desde una function
          // de libreria de terceros.
          // Por eso el warnning en consola
          this.ngZone.run( () => {
            this.router.navigateByUrl('/');          
          })
        }
      }, (error: any) => console.log(error)
    );
  }

}
