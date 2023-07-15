import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  private formSubmit: boolean = false;
  public formulario: FormGroup = new FormGroup({});

  constructor( private usuarioService: UsuarioService ) { }
  
  ngOnInit() {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required),
      terminos: new FormControl('', Validators.required),
    }, {
      validators: this.passwordsIguales('password', 'password2') 
    });
  }

  // Para utilizar el FormBuilder debemos de importar en el modulo donde lo trabajaremos,
  // en este caso el 'auth.module.ts' el ReactiveFormsModule
  // y en el 'app.module.ts' colocar en los providers el FormBuilder,
  // Sino da un error de inyeccion con el FormBuilder
  // public registerForms = this.formsBuilder.group({
  //   nombre: ['Mauro', Validators.required],
  //   email: ['test100@gmail.com', Validators.required],
  //   password: ['123456', Validators.required],
  //   password2: ['123456', Validators.required],
  //   terminos: [false, Validators.required]
  // });

  public crearUsuario(){
    //console.log(this.registerForms.value);
    this.formSubmit = true;
    
    if (this.formulario.valid) {
      
      this.usuarioService.crearUsuario(this.formulario.value)
        .subscribe( resp => {
          Swal.fire({
            title: 'Usuario Creado',
            icon: 'success'
          });

        }, ( err ) => {
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: err.error.message
          });

        } );
    }else{
      console.log('Formulario Invalido');
      console.log(this.formulario.controls);
    }
  }

  public campoNoValido(campo: string): boolean{

    if (this.formulario.get(campo)?.invalid && this.formSubmit) {
      return true;
    }else{
      return false;
    }
  }

  public aceptarTerminos(campo: string): boolean{
    return !this.formulario.get(campo)?.value && this.formSubmit
  }

  public validarPasswords(pass1: string, pass2: string): boolean{
    
    const password1 = this.formulario.get(pass1)?.value;
    const password2 = this.formulario.get(pass2)?.value;

    if(password1 === '' && password2 === ''){
      return false;
    }

    if ((password1 === password2)) {
      return false;
    } else {
      return true;
    }
  }

  private passwordsIguales(pass1: string, pass2: string){

    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password1 = this.formulario.get(pass1);
      const password2 = this.formulario.get(pass2);
      
      if (password1?.value === password2?.value) {
        password2?.setErrors(null);
        return null;
      }else{
        password2?.setErrors({ passwordsNoSonIguales: true });
        return { passwordsNoSonIguales: true };
      }
    }
    
  }
}
