
// Modulos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PagesModule } from './modules/pages/pages.module';
import { AuthModule } from './modules/auth/auth.module';

// Rutas
import { AppRoutingModule } from './modules/routes/app-routing.module';

// Componentes
import { AppComponent } from './app.component';
import { NotfoundpagesComponent } from './notfoundpages/notfoundpages.component';


@NgModule({
  declarations: [
    AppComponent,
    NotfoundpagesComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  providers: [ FormBuilder ],
  bootstrap: [AppComponent]
})
export class AppModule { }
