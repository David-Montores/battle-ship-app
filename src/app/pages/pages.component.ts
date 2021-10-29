import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {

  constructor() { }




  // if (typeof (this.tablero[fila]) != 'string') {
  //   localReference.push(indexShip + '-' + fila + shipX);
  //   console.log(localReference);
  // } else {
  //   console.log('Se iba a sobre poner un barco');
  //   return false;
  // }










  // placeShip(ships, random(game.size), battleships[ships], random(2) ? 'horizontal' : 'vertical'), `Ship '${ships}' placement`)) break;
  // placeShip(id, position, size, orientation = 'horizontal') {
  //   let posY = Math.floor(position / this.x)
  //   let posX = position % this.x
  //   let placed = false

  //   if (!this.ships.includes(id)) {
  //     switch (orientation) {
  //       case 'horizontal':
  //         if (size + posX <= this.x) {
  //           placed = this.setShip(id, position, size, 1)
  //         }
  //         break;
  //       case 'vertical':
  //         if (size + posY <= this.y) {
  //           placed = this.setShip(id, position, size, this.x)
  //         }
  //         break;
  //     }
  //     if (placed) this.ships.push(id) // setting ship is successful include ship in ships
  //   }
  //   return placed
  // }
  // setShip(id, position, size, adjustment) {
  //   let ship = [],
  //     ret = true
  //   for (let i = 0; i < size; i++) {
  //     let pos = position + (i * adjustment)
  //     if (!this.checkPosition(pos)) ship.push(pos)
  //     else {
  //       ret = false
  //       break;
  //     }
  //   }
  //   if (ret)
  //     for (let i of ship) this.map[i] = id
  //   return ret
  // }


}
