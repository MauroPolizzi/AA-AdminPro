import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';

import { HospitalModel } from 'src/app/models/hospital.model';

import { HospitalService } from '../../../Services/entidades/hospital/hospital.service';
import { ModalImageService } from '../../../Services/collectionAndFiles/modal-image.service';
import { SearchService } from 'src/app/Services/search/search.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})

export class HospitalesComponent implements OnInit, OnDestroy {

  private imgSubida!: Subscription;

  public hospitales: any[] = [];
  public hospitalesTemporales: any[] = [];
  public totalHospitales: number = 0;
  public pagina: number = 0;
  public loader: boolean = true;

  constructor(private hospitalService: HospitalService, 
    private searchService: SearchService, 
    public modalImageService: ModalImageService,
    private router: Router) { 
    //hospitalService.getHospital2().subscribe( (resp: any) => { console.log('GetHospital2: ', resp.hospitalCollection[0]) } )
  }
  
  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubida = 
      this.modalImageService.imgSubida.pipe( delay(100) ).subscribe( img => this.cargarHospitales() );
  }
  
  ngOnDestroy(): void {
    this.imgSubida.unsubscribe();
  }

  public cargarHospitales(){
  
    this.loader = true;
    this.hospitalService.getHospital(this.pagina)
      .subscribe( (resp: any) => {
        this.totalHospitales = resp.total;
        
        if(resp.hospitalCollection.length !== 0){
          this.hospitales = resp.hospitalCollection;
          this.hospitalesTemporales = this.hospitales;
          this.loader = false;
        }
      });
  }

  public cambiarPagina( valor: number ){
    
    this.pagina += valor;

    if(this.pagina < 0){
      this.pagina = 0;
    }else if(this.pagina >= this.totalHospitales){
      this.pagina -= valor;
    }

    this.cargarHospitales();
  }

  public buscar(query: string){
    
    if(query.length === 0){
      return this.hospitales = this.hospitalesTemporales;
    }

    this.searchService.buscar('hospital', query)
      .subscribe( (resp: any) => {
        console.log(resp);
        this.hospitales = resp;
      });
  }

  public cambiarImageHospital(hospital: HospitalModel){    
    this.modalImageService.abrirModal('hospitales', hospital.Guid || '', hospital.img);
  }

  public borrar(hospital: HospitalModel){

    Swal.fire({
      title: 'Eliminar hospital',
      text: `Deseas eliminar el hospital ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true, 
      confirmButtonText: 'Eliminar'
    }).then( (result => {

      if(result.isConfirmed){
        this.hospitalService.eliminarHospital(hospital)
          .subscribe( (resp: any) => {
            Swal.fire({
              title: resp.message,
              icon: 'success',
              text: `Se elimino con exito el hospital: ${hospital.nombre}`
            });

            // Una vez confirmada la accion de eliminar, volvemos a cargar la lista de hospitales
            this.cargarHospitales();
          })
      }
    }))
  }

  public actualizarHospital(hospital: HospitalModel){

    this.hospitalService.actualizarHospital(hospital)
      .subscribe( async (resp: HospitalModel) => {
        await Swal.fire({
          title: 'Hospital Modificado',
          icon: 'success'
        });

        this.cargarHospitales();

      }, (error) => {
        
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: error.error.message
        });
      });
  }

  public abrirModalCreacion() {

    this.router.navigateByUrl(`/dasboard/hospital/nuevo`);
  }
}
