import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // public tablero: { [key: string]: Array<number | string> } = {
  //   A: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  //   B: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  //   C: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  //   D: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  //   E: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  //   F: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  //   G: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  //   H: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  //   I: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  //   J: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  // };
  public tablero: { [key: string]: Array<number | string> } = {
    A: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
    B: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
    C: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
    D: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
    E: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
    F: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
    G: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
    H: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
    I: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
    J: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
  };

  public totalX = this.tablero[Object.keys(this.tablero)[0]].length;
  public totalY = Object.keys(this.tablero).length;
  public game_size = this.totalX * this.totalY;

  public ships: { [key: string]: number } = {
    A: 4,
    B: 3,
    C: 3
  };
  public reference: Array<string> = [];

  constructor() { }

  ngOnInit(): void {
    this.asignValues();
  }

  random(num: number) {
    const randomNum = Math.random();
    return Math.floor(randomNum * num);
  }

  public asignValues() {
    for (const shipKey in this.ships) {
      while (true)
        if (this.asignShips(shipKey, this.ships[shipKey], this.random(2) ? 'horizontal' : 'vertical')) break;
    }
    console.table(this.tablero);
  }

  public asignShips(indexShip: string, shipSize: number, orientation: string): boolean {
    const shipX: number = this.random(this.totalX);
    const shipY: number = this.random(this.totalY);
    let placed: boolean = false;

    placed = this.setShip(indexShip, shipSize, shipX, shipY, orientation);
    return placed;
  }

  public setShip(idShip: string, shipSize: number, shipX: number, shipY: number, orientation: string): boolean {
    let contador = 0;
    let localReference = [];

    if (orientation === 'horizontal') {
      console.log('------Horizontal');
      const fila = Object.keys(this.tablero)[shipY];

      for (let i = shipX; i < this.totalX; i++) {
        contador++;
        const columna = i;

        if (this.tablero[Object.keys(this.tablero)[shipY]][i] === '-') {
          localReference.push(idShip + '-' + fila + columna);
        } else {
          console.warn('Se iba a sobre poner un barco');
          return false;
        }

        if (contador == shipSize) {
          console.log('Llego al limite del barco');
          break;
        }
      }

    } else {
      console.log('------Vertical');
      const columna = shipX;

      for (let i = shipY; i < this.totalY; i++) {
        contador++;
        let fila = Object.keys(this.tablero)[i];

        if (this.tablero[Object.keys(this.tablero)[i]][shipX] === '-') {
          localReference.push(idShip + '-' + fila + columna);
        } else {
          console.warn('Se iba a sobre poner un barco');
          return false;
        }


        if (contador == shipSize) {
          console.log('Llego al limite del barco');
          break;
        }
      }
    }

    if (contador < shipSize) {
      console.log('Se paso del length');
      return false;
    }

    console.log('localReference:', localReference);
    this.addToTable(localReference);
    return true;

  }

  public addToTable(reference: Array<string>): void {
    for (let i = 0; i < reference.length; i++) {
      const referencia = reference[i];
      let filaReferencia: string = referencia[2];
      let colReferencia: number = +referencia[3];

      this.tablero[filaReferencia][colReferencia] = referencia[0];
    }
  }

  public checkPosition(indexShip: string | number, positionX: number, positionY: number) {
    console.log(`${indexShip}-${positionX}${positionY}`);

  }

  public limitShips(indexInit: number, length: number, shipSize: number, shipX: number, shipY: number): number {
    let contador = 0;
    console.log(shipY);


    for (let i = indexInit; i < length; i++) {
      contador++;



      let fila = Object.keys(this.tablero)[i];
      let columna = this.tablero[Object.keys(this.tablero)[shipY]][i];

      this.reference.push(fila + columna);

      if (contador == shipSize) {
        console.log('Llego al limite del barco');
        break;
      }
    }

    console.log(this.reference);
    return contador
  }

}