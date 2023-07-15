import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy {
  
  // Esta props se la usara para guardar el valor de emision del Observavle al que nos subscribimos
  // Para posteriormente usar el 'unsubscribe' y destruir el Observable
  private intervalSubs = new Subscription();

  constructor() { 
    // Manejamos el error a traves del retry()
    // Esto vuelve a ejecutar el codigo cuando da un error
    // el parametro que pasamos es para que lo intente una vez mas,
    // luego del pirmer error que obtiene
    // this.GetObservable()
    // .pipe( retry(1) )
    // .subscribe(
    //   valor => console.log('Subs: ', valor),
    //   error => console.warn('Error: ', error),
    //   () => console.info('Obs terminado')
    //   );

    this.intervalSubs = this.GetInterval().subscribe(console.log);

  }

  // Con este metodo destrumos la subscripcion a un Observable
  // El metodo se ejecuta cuando se abandona la pagina donde se
  // esta usando el componente que posee el Observable
  ngOnDestroy(): void {
    
    this.intervalSubs.unsubscribe();
  }
    
  // Uso de los operadores de Rxjs
  public GetInterval(): Observable<number> {
      
    return interval(500)
        .pipe(
          take(20),
          map(valor => valor + 1),
          filter(valor => (valor % 2 === 0) ? true : false),
       );
  }

  // Generamos un metodo que retorna un Observable de tipo numero
  // Manejamos el uso basico de un Observable
  public GetObservable(): Observable<number>{ 
    
    let index = -1;
    
    return new Observable<number>( observer => {
      
    const intervalo = setInterval( () => {
        
      index++;
      observer.next(index);

      // Limpiamos el intervalo y completamos el Observable
      if(index === 4){
        clearInterval(intervalo);
        observer.complete();
      }

      // Realizamos el manejo de Errores
      if(index === 2){
        index = 0;
        observer.error('El numero 2 es un numero malo, CUIDADO!!!')
      }

    }, 1000)
    
    });

  }

}
