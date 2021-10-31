import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  constructor(
    public configS: ConfigService,
    private route: Router
  ) { }

  ngOnInit(): void {


    this.prepararTablero();
  }

  random(num: number) {
    const randomNum = Math.random();
    return Math.floor(randomNum * num);
  }

  public ponerBarcos() {
    for (const shipKey in this.configS.ships) {
      while (true)
        if (this.asignShips(shipKey, this.configS.ships[shipKey], this.random(2) ? 'horizontal' : 'vertical')) break;
    }
    console.table(this.configS.tablero);
  }

  public asignShips(indexShip: string, shipSize: number, orientation: string): boolean {
    const shipX: number = this.random(this.configS.totalX);
    const shipY: number = this.random(this.configS.totalY);
    let placed: boolean = false;

    placed = this.setShip(indexShip, shipSize, shipX, shipY, orientation);
    return placed;
  }

  public setShip(idShip: string, shipSize: number, shipX: number, shipY: number, orientation: string): boolean {
    let localReference = [];

    if (orientation === 'horizontal') {
      console.log('------Horizontal');
      localReference = this.checkSpaces(shipX, this.configS.totalX, shipY, null, shipSize);

    } else {
      console.log('------Vertical');
      localReference = this.checkSpaces(shipY, this.configS.totalY, null, shipX, shipSize);
    }

    if (localReference.length == 0) {
      console.log('Se paso del length');
      return false;
    }

    this.addToTable(localReference, idShip);
    Object.defineProperty(this.configS.reference, idShip, { value: [...localReference], configurable: true, enumerable: true });
    console.log('Reference:', this.configS.reference);
    return true;

  }

  public addToTable(reference: Array<string>, idShip: string): void {
    for (let i = 0; i < reference.length; i++) {
      const referencia = reference[i];
      let filaReferencia: string = referencia[0];
      let colReferencia: number = +referencia[1];

      this.configS.tablero[filaReferencia][colReferencia] = idShip;
    }
  }

  public checkPosition(idShip: string | number, positionX: string, positionY: number) {
    const element: HTMLElement | null = document.getElementById(positionX + positionY);

    if (element !== null && this.configS.turnos > 0) {
      if (element.classList.contains('hit') || element.classList.contains('miss')) return;

      if (this.configS.reference.hasOwnProperty(idShip)) {
        // console.log('HAY UN BARQUITO');
        const coords: number = this.configS.reference[idShip].indexOf(positionX + positionY);
        if (coords >= 0) {
          // console.log('Esta elimando la posicion');
          this.configS.reference[idShip].splice(coords, 1);
        }
        if (this.configS.reference[idShip].length == 0) {
          delete this.configS.reference[idShip];

          if (Object.keys(this.configS.reference).length === 0) {
            console.log("HAS GANA'O");
            this.configS.turnos = 0;
            this.juegoTerminado('victoria');
          }
        }
        element.classList.add('hit');
        let elementChild = document.getElementById('equis' + positionX + positionY);
        if (elementChild !== null) {
          elementChild.innerHTML = '&#10060';
        }

      } else {
        // console.log('ES UN ESPACIO VACIO');
        if (!element.classList.contains('hit')) {
          element.classList.add('miss');
        }
      }
      this.configS.turnos--;

      if (this.configS.turnos === 0) {
        console.log('TE HAS QUEDADO SIN TURNOS');
        this.juegoTerminado('derrota');
      }
    }
  }

  public juegoTerminado(estatus: string): void {
    const toast = Swal.mixin({
      toast: true,
    });

    if (estatus === 'victoria') {
      toast.fire({
        title: 'Has ganado',
        text: "¿Jugar otra vez?",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Volver a jugar'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Jugará de nuevo');
          this.prepararTablero();
        } else {
          this.route.navigate(['home']);

        }
      });

    } else if (estatus === 'derrota') {
      toast.fire({
        title: 'Has perdido',
        text: "¿Reintentar?",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Reintentar'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Jugará de nuevo');
          this.prepararTablero();
        } else {
          this.route.navigate(['home']);

        }
      });

    }
  }

  public prepararTablero(): void {
    console.log('Se limpiara el tablero');
    let turnos = (localStorage.getItem('turnos')) ? localStorage.getItem('turnos') : 0;
    if (turnos !== null) this.configS.turnos = +turnos;

    this.configS.tablero = this.configS.crearTablero();
    this.configS.reference = this.configS.limpiarReferencia();
    this.ponerBarcos();
  }

  public checkSpaces(indexStart: number, totalXY: number, shipY: any, shipX: any, shipSize: number): Array<string> {
    const localReference: Array<string> = [];
    let contador = 0;

    for (let i = indexStart; i < totalXY; i++) {
      contador++;
      const fila = Object.keys(this.configS.tablero)[(shipY === null) ? i : shipY];
      const columna = (shipX === null) ? i : shipX;

      if (this.configS.tablero[fila][columna] === '-') {
        localReference.push(fila + columna);
      } else {
        console.warn('Se iba a sobre poner un barco');
        return [];
      }

      if (contador == shipSize) {
        console.log('Llego al limite del barco');
        break;
      }

    }

    if (contador < shipSize) {
      console.log('Se paso del length');
      return [];
    }

    return localReference;
  }

}
