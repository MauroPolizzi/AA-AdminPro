import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';

import { MedicoModel } from 'src/app/models/medico.model';

import { MedicoService } from 'src/app/Services/entidades/medico/medico.service';
import { ModalImageService } from '../../../Services/collectionAndFiles/modal-image.service';
import { SearchService } from 'src/app/Services/search/search.service';
import { Router } from '@angular/router';


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
    private modalImageService: ModalImageService,
    private router: Router) { }
  
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

    // Sumamos el valor que viene desde el template
    this.pagina += valor;
    
    // Verificamos que la pagina nunca sea menor a cero (valor negativo, rompe el servidor)
    if(this.pagina < 0) this.pagina = 0;

    // Al volver atras cuando se tiene la pagina en cero, vuelve a realizar una consulta a la API,
    // esto se podria evitar usando un cache que guarde los datos y evitrar llamadas inecesarias.
    //if(this.pagina === 0) { console.log('Sin mas registros por mostrar');  return; }
    
    // Sabemos que la API devuelve 10 registros por paginado, y en la misma respuesta el total de registros en base de datos
    // En ese caso, no es necesario ejecutar ninguna accion si ya se visualiza el total de los registros 
    if(this.totalMedicos === this.pagina){ console.log('Sin mas registros por mostrar');  return; }
    
    // Solo si el total de registros supera el valor de pagina, enviamos una solicitud a la API
    if(this.totalMedicos > this.pagina) this.cargarMedicos();

    // Si el total de registros es inferior al valor de pagina, solo restamos el valor que viene desde el template a pagina
    if(this.totalMedicos < this.pagina){
      this.pagina -= valor;
      return;
    }
    
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

            // Una vez confirmada la accion de eliminar, seteamos la pagina en 0 y volvemos a cargar la lista de medicos
            this.pagina = 0;
            this.cargarMedicos();
          })
      }
    }))
  }

  public async actualizarMedico(medico: MedicoModel){

    this.medicoService.actualizarMedico(medico)
      .subscribe( async (resp: MedicoModel) => {
        await Swal.fire({
          title: 'Medico Modificado',
          icon: 'success',
        });

        this.cargarMedicos();
      
      }, (error) => {
    
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: error.error.message
        });
      });
  }

  public async abrirModalCreacion() {
    
    this.router.navigateByUrl(`/dasboard/medico/nuevo`);
  }
}
