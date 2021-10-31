import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {

  constructor() { }

  // const fila = Object.keys(this.tablero)[shipY];
  // for (let i = shipX; i < this.totalX; i++) {
  //   contador++;
  //   const columna = i;
  //   if (this.tablero[Object.keys(this.tablero)[shipY]][i] === '-') {
  //     localReference.push(fila + columna);
  //   } else {
  //     return false;
  //   }
  //   if (contador == shipSize) {
  //     break;
  //   }
  // }

  // const columna = shipX;
  // for (let i = shipY; i < this.totalY; i++) {
  //   contador++;
  //   let fila = Object.keys(this.tablero)[i];
  //   if (this.tablero[Object.keys(this.tablero)[i]][shipX] === '-') {
  //     localReference.push(fila + columna);
  //   } else {
  //     return false;
  //   }
  //   if (contador == shipSize) {
  //     break;
  //   }
  // }

}
