import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalUpdateService } from 'src/app/Services/collectionAndFiles/modal-update.service';
import { IModel } from 'src/app/models/Imodel.model';

@Component({
  selector: 'app-modal-update',
  templateUrl: './modal-update.component.html',
  styleUrls: ['./modal-update.component.css']
})

export class ModalUpdateComponent implements OnInit{

  constructor(public modalUpdate: ModalUpdateService) { }
  
  ngOnInit(): void {
  }
  
  public abrirModal(tipo: IModel){
    this.modalUpdate.abrirModal(tipo);
  }
  
  public cerrarModal(){
    this.modalUpdate.cerrarModal();
  }

}
