import { Injectable } from '@angular/core';
import { UpdateEntidadesModal } from 'src/app/interfaces/update-entidades-modal.interface';
import { IModel } from 'src/app/models/Imodel.model';

@Injectable({
  providedIn: 'root'
})
export class ModalUpdateService implements UpdateEntidadesModal {

  // Propiedad que tendra el tipo de objeto que abrio el modal
  public tipoIModel: string = ''; 
  // Creamos una propiedad para manejar el estado del modal
  private _ocultarModal: boolean = true;
  
  constructor() { }
  
  get ocultarModal(){
    return this._ocultarModal;
  }
  
  abrirModal(tipo: IModel): void {
    this._ocultarModal = false;
    this.tipoIModel = tipo.entityType!;
  }

  cerrarModal(): void {
    this._ocultarModal = true;
  }
}
