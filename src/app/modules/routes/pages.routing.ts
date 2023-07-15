
// Modulos
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Componentes
import { AuthGuard } from 'src/app/guard/auth.guard';
import { PagesComponent } from '../../pages/pages/pages.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { Grafica1Component } from '../../pages/grafica1/grafica1.component';
import { ProgressComponent } from '../../pages/progress/progress.component';
import { AccountSettingsComponent } from "../../pages/account-settings/account-settings.component";
import { PromisComponent } from 'src/app/pages/promis/promis.component';
import { RxjsComponent } from 'src/app/pages/rxjs/rxjs.component';

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
          { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafic' } },
          { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress Bar' } },
          { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Account Settings' } },         
          { path: 'promis', component: PromisComponent, data: { titulo: 'Promis' } },
          { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
        ]
    }    
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
