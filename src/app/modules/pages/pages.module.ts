import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Modulos externos
import { NgChartsModule } from 'ng2-charts';

// Modulos
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';

// Rutas
// Se pude dejar asi como esta
// o tambien importar el modulo de rutas
import { RouterModule } from "@angular/router";

// Componentes
import { AccountSettingsComponent } from '../../pages/account-settings/account-settings.component';
import { BusquedaComponent } from '../../pages/busqueda/busqueda.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { Grafica1Component } from '../../pages/grafica1/grafica1.component';
import { PagesComponent } from '../../pages/pages/pages.component';
import { ProgressComponent } from '../../pages/progress/progress.component';
import { PromisComponent } from '../../pages/promis/promis.component';
import { RxjsComponent } from '../../pages/rxjs/rxjs.component';

// Entidades
// Simples
import { MedicoComponent } from 'src/app/pages/entidades/medico/medico.component';

// Collection
import { HospitalesComponent } from 'src/app/pages/entidades/hospitales/hospitales.component';
import { MedicosComponent } from 'src/app/pages/entidades/medicos/medicos.component';
import { UsuariosComponent } from 'src/app/pages/entidades/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AccountSettingsComponent,
    BusquedaComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    ProgressComponent,
    PromisComponent,
    RxjsComponent,
    // Entidades
    // Simples
    MedicoComponent,
    // Collection
    HospitalesComponent,
    MedicosComponent,
    UsuariosComponent,
  ],
  exports: [
    AccountSettingsComponent,
    BusquedaComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    ProgressComponent,
    PromisComponent,
    RxjsComponent,
    // Entidades
    // Simples
    MedicoComponent,
    // Collection
    HospitalesComponent,
    MedicosComponent,
    UsuariosComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    RouterModule,
    NgChartsModule,
    PipesModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class PagesModule { }
