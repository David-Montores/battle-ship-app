import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private configS: ConfigService,
    private route: Router
  ) { }

  ngOnInit() { }

  public cambiarDificultad(turnos: number | string): void {

    if (turnos === 'Custom') {
      console.log('Numero custom');
      Swal.fire({
        title: 'Ingresa los turnos que desees',
        input: 'number',
        preConfirm: (value: number) => {
          if (value) {
            this.configS.turnos = value;
            localStorage.setItem('turnos', this.configS.turnos.toString());
            console.log(this.configS.turnos);
            this.route.navigate(['juego']);
          };
        }
      });

    } else {
      if (turnos === 'Infinity') {
        this.configS.turnos = Infinity;
      } else {
        this.configS.turnos = +turnos;
      }
      this.route.navigate(['juego']);

    }

    localStorage.setItem('turnos', this.configS.turnos.toString());
    console.log(this.configS.turnos);
  }

}