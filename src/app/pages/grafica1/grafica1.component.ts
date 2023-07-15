import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component {

  public labelsGrafica1: string[] = ['Comida', 'Fiesta', 'Ropa', 'Hobby'];
  public labelsGrafica2: string[] = ['Comida', 'Fiesta', 'Ropa', 'Hobby'];
  public labelsGrafica3: string[] = ['Comida', 'Fiesta', 'Ropa', 'Hobby'];
  
  public dataGrafica1: number[] = [40, 30, 20, 10];
  public dataGrafica2: number[] = [4, 55, 10, 40];
  public dataGrafica3: number[] = [32, 34, 65, 10];
  
}
