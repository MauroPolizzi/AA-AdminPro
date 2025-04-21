import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { HospitalModel } from 'src/app/models/hospital.model';

import { HospitalService } from 'src/app/Services/entidades/hospital/hospital.service';
import { MedicoService } from 'src/app/Services/entidades/medico/medico.service';
import { MedicoModel } from 'src/app/models/medico.model';
import { delay } from 'rxjs';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  public pagina: number = 0;
  public hospitales: HospitalModel[] = [];
  public formMedico: FormGroup = new FormGroup({});
  public hospitalSeleccionado: any;
  public medicoSeleccionado!: MedicoModel;

  constructor(private hospitalService: HospitalService,
            private medicoService: MedicoService, 
            private formBuilder: FormBuilder,
            private router: Router,
            private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.cargarMedico()
    this.cargarHospitales();

    // Formulario
    this.formMedico = this.formBuilder.group({
      nombre: ['', Validators.required],
      especialidad: ['', Validators.required],
      hospitalId: ['', Validators.required]
    });

    // Buscamos el hospital de la collection, para obtener la img
    this.formMedico.get('hospitalId')?.valueChanges
      .subscribe( (hospitalId: string) => {
        this.hospitalSeleccionado = this.hospitales.find(h => h.Guid === hospitalId);
      });
  }

  public cargarMedico() {
    
    // Leemos el id que viene desde la url y lo verificamos
    this.activateRoute.params
      .subscribe( ({ id }) => {
        if(id === 'nuevo') return; // Este nombre es puesto desde medicos.component.ts
        this.medicoService.getMedicoById(id)
          .pipe( delay(100) ) // Establecemos el delay para poder esperar a que cargue la img
          .subscribe( (resp: any) => { 

            this.medicoSeleccionado = resp;
            // Desestructuramos la respuesta
            const { nombre, especialidad, hospitalId: { _id: hospitalId } } = resp;
            // Y seteamos los valores del formulario (Ojo, siempre deben ser los mismos nombres que los grupos del form)
            this.formMedico.setValue({nombre, especialidad, hospitalId})
          })
      });

  }

  public cargarHospitales() {
    
    this.hospitalService.getHospital(this.pagina)
      .subscribe( (resp: any) => {
        this.hospitales = resp.hospitalCollection;
      });
  }

  public guardarCambios() {

    // Verificamos si debemos de actualizar o crear un medico
    if(this.medicoSeleccionado) {
      // Al tener la prop de MedicoSeleccionada valida, actualizamos ese medico
      this.actualizarMedico(this.medicoSeleccionado);
    } else{
      // En caso contrario, estamos creando un medico nuevo
      this.crearMedico()
    }
  }

  private actualizarMedico(medico: MedicoModel) {
    
    // Verificamos que el parametro sea valido
    if(!medico) return;

    // Desestructuramos el objeto del formulario
    const data: MedicoModel = {
      ...this.formMedico.value,
      guid: this.medicoSeleccionado.Guid
    }

    medico.nombre = data.nombre;
    medico.especialidad = data.especialidad;
    medico.hospitalId = data.hospitalId;

    //console.log('MedicoModificado: ', medico);
    
    // Llamamos al servicio para actualizar
    this.medicoService.actualizarMedico(medico)
      .subscribe( async resp => {
        //console.log(resp);
        
        await Swal.fire({
          title: `Se actualizo al medico: ${data.nombre}`,
          icon: 'success',
        });
      
        // Manejamos el error
      }, (error) => {
        console.log(error);
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: error.error.message
        });
      })
  }

  private crearMedico() {
    
    // Obtenemos los valores del formulario, lo indispensable para crear un medico
    const { nombre, especialidad, hospitalId } = this.formMedico.value;
    
    this.medicoService.crearMedico( {nombre, especialidad, hospitalId } )
      .subscribe( async (resp: any) => {
        
        await Swal.fire({
          title: `Se creo al medico: ${nombre}`,
          icon: 'success',
        });
        
        // Navegamos hasta la ruta, ya con el medico recien creado
        this.router.navigateByUrl(`/dasboard/medico/${resp.medicoDestino.Guid}`);

      }, (error) => {
    
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: error.error.message
        });
      });
  }
}
