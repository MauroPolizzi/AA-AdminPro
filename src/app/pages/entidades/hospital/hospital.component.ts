import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { HospitalModel } from 'src/app/models/hospital.model';

import { HospitalService } from 'src/app/Services/entidades/hospital/hospital.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {

  public imgFile!: File; 
  public imgTemp: any = null; 
  public formHospital: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private hospitalService: HospitalService, private router: Router) { }

  ngOnInit(): void {

    // Formulario
    this.formHospital = this.formBuilder.group({ nombre: ['', Validators.required] });
  }

  public guardarCambios() {

    // Obtenemos los valore del formulario.
    const nombre: string = this.formHospital.controls['nombre'].value;

    this.hospitalService.crearHospital({nombre})
      .subscribe( async (resp: HospitalModel) => {

        await Swal.fire({
          title: `Se creo el hospital: ${ nombre }`,
          icon: 'success'
        });
      
        // Navegamos a la ruta, ya con el hospital creado
        this.router.navigateByUrl('/dasboard/hospitales');

      }, (error) => {
        
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: error.error.message
        });
      });
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
  }

  public actualizarFoto() {
    
  }

}
