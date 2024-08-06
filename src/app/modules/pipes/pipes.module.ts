import { NgModule } from '@angular/core';
import { ImagenPipe } from 'src/app/pipes/imagen.pipe';



@NgModule({
  declarations: [
    ImagenPipe
  ],
  exports: [
    ImagenPipe
  ]
})
export class PipesModule { }
