import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit{

  @Input() progreso: number = 40;
  @Input() btnClass: string = 'btn-primary';

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  ngOnInit() {
    this.btnClass = `btn ${ this.btnClass }`;
  }

  cambiarPorcentaje( valor: number ) {
    
    // Al colocar el return para un metodo sin especificar el tipo 
    // de valor que va a devolver,
    // lo estamos poniendo de manera implicita
    // esto hara que se rompa la aplicacion
    // debemos modificar el 'tsconfig.json' // "noImplicitReturns": false,
    if(this.progreso >= 100 && valor >= 0){
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if(this.progreso <= 0 && valor < 0){
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    this.progreso = this.progreso + valor;
    this.valorSalida.emit( this.progreso );
  }

  onChange( event: number ){
    
    if(event >= 100){
      event = 100;
    }else if(event <= 0){
      event = 0;
    }else{
      this.progreso = event
    }

    this.valorSalida.emit( this.progreso );
  }
}
