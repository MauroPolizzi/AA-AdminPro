import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos externos
import { NgChartsModule } from 'ng2-charts';

// Modulos
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Componentes
import { IncrementadorComponent } from '../../components/incrementador/incrementador.component';
import { DoneComponent } from '../../components/done/done.component';
import { ModalImageComponent } from 'src/app/components/modal-image/modal-image.component';
import { ModalUpdateComponent } from 'src/app/components/modal-update/modal-update.component';
// Formularios de actualizacion
import { FormUpdateMedicoComponent } from 'src/app/components/form-update-medico/form-update-medico.component';
import { FormUpdateHospitalComponent } from 'src/app/components/form-update-hospital/form-update-hospital.component';

@NgModule({
  declarations: [
    IncrementadorComponent,
    DoneComponent,
    ModalImageComponent,
    ModalUpdateComponent,
    FormUpdateMedicoComponent,
    FormUpdateHospitalComponent
  ],
  exports: [
    IncrementadorComponent,
    DoneComponent,
    ModalImageComponent,
    ModalUpdateComponent,
    FormUpdateMedicoComponent,
    FormUpdateHospitalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
