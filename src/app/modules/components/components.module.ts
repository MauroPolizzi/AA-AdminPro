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

@NgModule({
  declarations: [
    IncrementadorComponent,
    DoneComponent,
    ModalImageComponent
  ],
  exports: [
    IncrementadorComponent,
    DoneComponent,
    ModalImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
