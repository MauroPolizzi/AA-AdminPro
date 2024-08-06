import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos externos
import { NgChartsModule } from 'ng2-charts';

// Modulos
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from '../pipes/pipes.module';

// Rutas
// Se pude dejar asi como esta
// o tambien importar el modulo de rutas
import { RouterModule } from "@angular/router";

// Componentes
import { ProgressComponent } from '../../pages/progress/progress.component';
import { Grafica1Component } from '../../pages/grafica1/grafica1.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { PagesComponent } from '../../pages/pages/pages.component';
import { AccountSettingsComponent } from '../../pages/account-settings/account-settings.component';
import { PromisComponent } from '../../pages/promis/promis.component';
import { RxjsComponent } from '../../pages/rxjs/rxjs.component';

// Entidades
import { UsuariosComponent } from 'src/app/pages/entidades/usuarios/usuarios.component';
import { MedicosComponent } from 'src/app/pages/entidades/medicos/medicos.component';
import { HospitalesComponent } from 'src/app/pages/entidades/hospitales/hospitales.component';

@NgModule({
  declarations: [
    ProgressComponent,
    Grafica1Component,
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
    PromisComponent,
    RxjsComponent,
    // Entidades
    UsuariosComponent,
    MedicosComponent,
    HospitalesComponent
  ],
  exports: [
    ProgressComponent,
    Grafica1Component,
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
    PromisComponent,
    RxjsComponent,
    // Entidades
    UsuariosComponent,
    MedicosComponent,
    HospitalesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ComponentsModule,
    NgChartsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class PagesModule { }
