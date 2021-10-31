import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements OnInit {

  constructor() { }

  public tablero: { [key: string]: Array<number | string> } = this.crearTablero();

  public totalX = this.tablero[Object.keys(this.tablero)[0]].length;
  public totalY = Object.keys(this.tablero).length;
  public game_size = this.totalX * this.totalY;

  public reference: { [key: string]: Array<string> } = this.limpiarReferencia();
  public ships: { [key: string]: number } = {
    A: 4,
    B: 3,
    C: 3,
    D: 2,
    E: 2,
    F: 2,
    G: 1,
    H: 1,
    I: 1,
    J: 1,
  };

  public turnos: number = 0;

  ngOnInit() {
    this.crearTablero();
  }

  public crearTablero(): { [key: string]: Array<number | string> } {
    return {
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
    }
  }

  public limpiarReferencia(): { [key: string]: Array<string> } {
    return {};
  }


}
