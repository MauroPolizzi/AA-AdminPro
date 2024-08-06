import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MedicoService } from '../../Services/entidades/medico/medico.service';

@Component({
  selector: 'app-form-update-medico',
  templateUrl: './form-update-medico.component.html',
  styleUrls: ['./form-update-medico.component.css']
})
export class FormUpdateMedicoComponent implements OnInit, OnDestroy {

  public formsUpdateMedico: FormGroup = new FormGroup({});

  constructor(private medicoService: MedicoService) { }
  
  ngOnInit(): void {
    
    this.formsUpdateMedico = new FormGroup({
      nombre: new FormControl(this.medicoService.medicoUpdate.nombre, Validators.required),
      especialidad: new FormControl(this.medicoService.medicoUpdate.especialidad, Validators.required)
    })
  }
  
  ngOnDestroy(): void {
    // Destruimos el formulario cuando se cierra el modal
    console.log('Destruyendo Form');
    this.formsUpdateMedico.reset();
  }
}
