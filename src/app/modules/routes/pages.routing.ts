
// Modulos
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guard
import { AuthGuard } from 'src/app/guard/auth.guard';

// Componentes
import { AccountSettingsComponent } from "../../pages/account-settings/account-settings.component";
import { BusquedaComponent } from 'src/app/pages/busqueda/busqueda.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { Grafica1Component } from '../../pages/grafica1/grafica1.component';
import { MyProfileComponent } from 'src/app/pages/my-profile/my-profile.component';
import { PagesComponent } from '../../pages/pages/pages.component';
import { ProgressComponent } from '../../pages/progress/progress.component';
import { PromisComponent } from 'src/app/pages/promis/promis.component';
import { RxjsComponent } from 'src/app/pages/rxjs/rxjs.component';

// Entidades
// Simples
import { MedicoComponent } from 'src/app/pages/entidades/medico/medico.component';

// Collection
import { HospitalesComponent } from 'src/app/pages/entidades/hospitales/hospitales.component';
import { MedicosComponent } from 'src/app/pages/entidades/medicos/medicos.component';
import { UsuariosComponent } from 'src/app/pages/entidades/usuarios/usuarios.component';

// Este es el sistema de rutas independiente para las 
// rutas hijas del componente PagesComponent
const routes: Routes = [
    {
        path: 'dasboard', 
        component: PagesComponent,
        canActivate: [AuthGuard],
        // implementamos las rutas hijas para el componente de Psges    
        children: [
          { path: '', component: DashboardComponent, data: { titulo: 'Dasboard' } },
          { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Account Settings' } },         
          { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Busqueda Global' } },
          { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafic' } },
          { path: 'myprofile', component: MyProfileComponent, data: { titulo: 'My Profile' } },
          { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress Bar' } },
          { path: 'promis', component: PromisComponent, data: { titulo: 'Promis' } },
          { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
          
          // Entidades
          // Simples
          { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Medico' } },
          
          // Collections
          { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales' } },
          { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos' } },
          { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' } },
        ]
    }    
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
