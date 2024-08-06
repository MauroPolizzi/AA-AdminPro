import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { UsuarioModel } from '../../models/usuario.model';

import { ModalImageService } from './modal-image.service';
import { UsuarioService } from '../entidades/usuario/usuario.service';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  public usuario: UsuarioModel = this.usuarioServicio.usuario;

  constructor(private usuarioServicio: UsuarioService, private modalImageService: ModalImageService) { }

  public async actualizarFoto(
    file: File, tipo: 'usuarios' | 'medicos' | 'hospitales', guid: string ){
    
      try {
        
        const url = `${base_url}/fileupload/${tipo}/${guid}`;
        const formData = new FormData();
        formData.append('img', file);
        
        const resp = await fetch(url, {
          method: 'PUT',
          headers: {
            'x-token': localStorage.getItem('token') || ''
          },
          body: formData

        });

        const data = await resp.json();
        
        if (data.ok) {
          
          await Swal.fire({
            title: 'Foto actualizada',
            icon: 'success'
          });

          //console.log(data);

          // Emitimos el nombre del archivo, que es lo que nos devuelve el back
          this.modalImageService.imgSubida.emit(data.nombreArchivo);
          return data.nombreArchivo;
        
        } else {
          
          //console.log(data.message);
          
          await Swal.fire({
            title: 'Errores encontrados',
            icon: 'error',
            text: data.message
          });

          return false;
        }

      } catch (error) {

        console.log(error);
        return false;
      }
  }
}
