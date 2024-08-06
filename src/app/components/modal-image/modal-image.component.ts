import { Component, OnInit } from '@angular/core';
import { ModalImageService } from '../../Services/collectionAndFiles/modal-image.service';
import { UsuarioService } from 'src/app/Services/entidades/usuario/usuario.service';
import { FileUploadService } from '../../Services/collectionAndFiles/file-upload.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent implements OnInit {
  
  private tipo!: 'usuarios' | 'medicos' | 'hospitales';

  public imgFile!: File;
  public imgTemp: any = null;

  // Dejamos publico el Service para usarlo en el template
  constructor(public modalImageService: ModalImageService, private usuarioService: UsuarioService, private fileUploadService: FileUploadService ) { }

  ngOnInit(): void {
  }

  public cerrarModal(){
    //this.ocultarModal = true;
    this.imgTemp = null;
    this.modalImageService.cerrarModal();
    
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

  public actualizarFoto(guid: string) {

    //console.log(`${guid}, ${this.modalImageService.tipo}`);

    this.fileUploadService
      .actualizarFoto(this.imgFile, this.modalImageService.tipo, guid || '')

    this.cerrarModal();
  }

}
