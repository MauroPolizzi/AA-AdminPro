
// Modulos
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { PagesRoutingModule } from './pages.routing';
import { AuthRoutingModule } from './auth.routing';

// Componentes
import { NotfoundpagesComponent } from '../../notfoundpages/notfoundpages.component';

// Este es nuestro Modulo principal de rutas
// cualquer tipo de rutas hijas es conveniente 
// hacerlas en un archivo de rutas aparte, o tambien puede ser un modulo
// y luego importarlas aqui.
const routes: Routes = [
  
  { path: '', redirectTo: '/dasboard', pathMatch: 'full' },
  { path: '**', component: NotfoundpagesComponent }
];

@NgModule({ 
  declarations: [],
  imports: [
    RouterModule.forRoot( routes ),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule, AuthRoutingModule ]
})
export class AppRoutingModule { }
