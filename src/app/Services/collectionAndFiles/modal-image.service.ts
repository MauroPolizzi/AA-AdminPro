import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  // Creamos una propiedad para manejar el estado del modal
  private _ocultarModal: boolean = true;
  
  public tipo!: 'usuarios' | 'medicos' | 'hospitales';
  public Guid!: string;
  public img!: string;

  // Propiedad que va a emitir un string que sera el url de la img que actualizamos
  public imgSubida: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  // Creamos un get para obtener el valor del modal
  get ocultarModal(){
    return this._ocultarModal;
  }

  // Al abrir el modal, capturamos la img que ya tiene el usuario
  abrirModal(tipo: 'usuarios' | 'medicos' | 'hospitales', guid: string, img = 'no-img'){
    
    this._ocultarModal = false;
    
    this.tipo = tipo;
    this.Guid = guid;
    this.img = img;
    
    if(img.includes('http')){
      this.img = img;
    } else {
      this.img = `${environment.base_url}/fileupload/${ tipo }/${ img }`
    }
  }

  cerrarModal(){
    this._ocultarModal = true;
  }


}
