import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FileUploadService } from 'src/app/Services/collectionAndFiles/file-upload.service';
import { UsuarioService } from 'src/app/Services/entidades/usuario/usuario.service';

import { UsuarioModel } from 'src/app/models/usuario.model';



@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  public usuario: UsuarioModel = this.usuarioServicio.usuario;
  public formsMyProfile: FormGroup = new FormGroup({});
  public imgFile!: File;
  public imgTemp: any = null;

  constructor(private usuarioServicio: UsuarioService,
              private fileUploadService: FileUploadService) { 
    
    this.usuario.img = usuarioServicio.usuario.getImageUrl;
  }

  ngOnInit(): void {

    this.formsMyProfile = new FormGroup({
      
      nombre: new FormControl(this.usuario.nombre, Validators.required),
      email: new FormControl(this.usuario.email, [Validators.required, Validators.email]),
      password: new FormControl(this.usuario.password),
      address: new FormControl()
    });
  }

  public actualizarUsuario(){
    
    this.usuarioServicio.actualizarUsuario(this.formsMyProfile.value);
  }

  public capturarFoto(event: any) {
    this.imgFile = event?.target?.files[0];
    
    // Cambiamos en tiempo real la img antes de llamar al backend
    if(!this.imgFile) { return; }

    // Instanciamos un obj reader, libreria propia de Js
    const reader = new FileReader();
    // Transformamos ese obj reader en un base64
    const url64 = reader.readAsDataURL(this.imgFile);

    // Devolvemos el resultado
    reader.onload = () => {
      this.imgTemp = reader.result;
      //console.log(reader.result);
    }

    //console.log('Img capturada: ', this.imgFile);
  }

  public actualizarFoto() {
    this.fileUploadService
      .actualizarFoto(this.imgFile, 'usuarios', this.usuario.Guid || '')
      .then(img => this.usuario.img = img);
  }

}
