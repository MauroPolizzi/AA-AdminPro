import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';

import { MedicoModel } from 'src/app/models/medico.model';

import { MedicoService } from 'src/app/Services/entidades/medico/medico.service';
import { ModalUpdateService } from 'src/app/Services/collectionAndFiles/modal-update.service';
import { ModalImageService } from '../../../Services/collectionAndFiles/modal-image.service';
import { SearchService } from 'src/app/Services/search/search.service';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit, OnDestroy {

  private imgSubida!: Subscription;

  public medicos: any[] = [];
  public medicosTemporales: any[] = [];
  public totalMedicos: number = 0;
  public pagina: number = 0;
  public loader: boolean = true;
  
  constructor(private medicoService: MedicoService, private search: SearchService, 
    private modalImageService: ModalImageService, private modalUpdate: ModalUpdateService) { }
  
  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubida = 
    this.modalImageService.imgSubida.pipe( delay(100) ).subscribe( img => this.cargarMedicos() );
  }
  
  ngOnDestroy(): void {
    this.imgSubida.unsubscribe();
  }

  public cargarMedicos(){
  
    this.loader = true;
    this.medicoService.getMedicos(this.pagina)
      .subscribe( (resp: any) => {
        this.totalMedicos = resp.total;
        
        if(resp.medicoCollection.length !== 0){
          this.medicos = resp.medicoCollection;
          this.medicosTemporales = this.medicos;
          this.loader = false;
        }
      });
  }

  public cambiarPagina( valor: number ){
    
    this.pagina += valor;

    if(this.pagina < 0){
      this.pagina = 0;
    }else if(this.pagina >= this.totalMedicos){
      this.pagina -= valor;
    }

    this.cargarMedicos();
  }

  public buscar(query: string){

    if(query.length === 0){
      return this.medicos = this.medicosTemporales;
    }

    this.search.buscar('medico', query)
      .subscribe( (resp: any) => {
        this.medicos = resp
      });
  }

  public cambiarImagenMedico(medico: MedicoModel){
    this.modalImageService.abrirModal('medicos', medico.Guid || '', medico.img);
  }

  public borrar(medico: MedicoModel){

    Swal.fire({
      title: 'Eliminar Medico',
      text: `Deseas eliminar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result => {

      if(result.isConfirmed){

        this.medicoService.eliminarMedico(medico)
          .subscribe( (resp: any) => {
            Swal.fire({
              title: resp.message,
              icon: 'success',
              text: `Se elimino con exito al medico: ${medico.nombre}`
            });

            // Una vez confirmada la accion de eliminar, volvemos a cargar la lista de medicos
            this.cargarMedicos();
          })
      }
    }))
  }

  public actualizarMedico(medico: MedicoModel){
    medico.entityType = 'medico';
    // Igualamos la prop del servicio con la que recibimos por paramtero
    this.medicoService.medicoUpdate = medico; 
    this.modalUpdate.abrirModal(medico);
  }
}
