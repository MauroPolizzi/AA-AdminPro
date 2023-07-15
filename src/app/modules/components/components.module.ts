import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos externos
import { NgChartsModule } from 'ng2-charts';

// Modulos
import { FormsModule } from "@angular/forms";

// Componentes
import { IncrementadorComponent } from '../../components/incrementador/incrementador.component';
import { DoneComponent } from '../../components/done/done.component';

@NgModule({
  declarations: [
    IncrementadorComponent,
    DoneComponent
  ],
  exports: [
    IncrementadorComponent,
    DoneComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
