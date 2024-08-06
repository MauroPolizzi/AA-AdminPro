import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {
  // Propiedad donde seteamos el ancho desde ts
  //[style.width]="getPorcentaje" 

  progreso1: number = 0;
  progreso2: number = 0;

  getProgreso1() {
    return `${ this.progreso1 }%`;
  }
  
  getProgreso2() {
    return `${ this.progreso2 }%`;
  }

  getValorOutput( valor: number ){
    console.log('valor que viene desde el Output: ', valor);
  }
}
