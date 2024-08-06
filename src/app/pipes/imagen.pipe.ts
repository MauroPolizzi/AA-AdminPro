import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios' | 'medicos' | 'hospitales'): string {

    if(!img) {
      return `${ base_url }/fileupload/${ tipo }/no-image-jpg`
      // Si nos autenticamos con google
    } else if(img?.includes('http')) {
        return img;
  
    } else if (img) {
        // Si nos autenticamos con email y password
        // /fileupload/usuarios/302522c9-5096-4883-8bf6-757696f0ec89.png
        return `${ base_url }/fileupload/${ tipo }/${ img }`;
        
    } else {
        return `${ base_url }/fileupload/no-image-jpg`
    }
  }

}
