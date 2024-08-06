import { Component, Input, SimpleChange } from '@angular/core';
import { ChartData, ChartType, TooltipLabelStyle,  } from 'chart.js';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent {

  @Input() title: string = 'Sin titulo';
  @Input('labels') doughnutChartLabels: string[] = [ 'Done-Store', 'In-Store Sales', 'Mail-Order Sales', 'Mili-pili' ];
  @Input('data') dataSet: number[] = [20, 20, 20];

  // La libreria de Angular Charts Demo es compatible con versiones de Angular 14
  // Pero en la version de la libreria 
  // chart.js => 3.9.1
  // ng2-charts => 4.0.0
  // Por defecto se pueden instalar versiones mas viejas y no funcionaran y rompen toda la app
  // La solucion fue:
  
  // Desinstalé las librerias ng2-charts y charts.js
  // Luego volví a instalarlas sin indicar versión

  // $ npm install --save ng2-charts --force
  // $ npm install --save chart.js --force
  
  // Comprobé que las versiones que se instalaban no eran las más nuevas. Seguían siendo antiguas. 
  // A continuación busqué y actualicé todas mis librerías a sus respectivas últimas versiones:
  
  // $ npm install -g npm-check-updates  
  // $ ncu -u  
  // $ npm install    

  // Ahora funciona correctamente!!
  

  // Definimos props de tipo propia de la libreria
  // Definimos los labels que representan los datos
  // Definimos el tipo de grafica que usaremos, 'doughnut' es dona o rosquilla 
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      // Definimos los porcentajes para cada label
      { data: [ 350, 450, 100, 50 ],
        backgroundColor: ['#9E120E','#FF5800','#FFB414', 'FF2323']
      },
    ]
  };
  // Esta prop la podemos obviar, y solo pasar el string al cmpt html
  // [type] = "doughnut"
  public doughnutChartType: ChartType = 'doughnut';


  // implementamos esta funcion para poder pasar bien los datos
  // a la pagina donde se usara la dona (cmpt). 
  // En este caso es la grafica1
  ngOnChanges(): void {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [{
        data: this.dataSet,
        backgroundColor: ['#9E120E','#FF5800','#FFB414', 'FF2323']
      }]
    }
  }

}
