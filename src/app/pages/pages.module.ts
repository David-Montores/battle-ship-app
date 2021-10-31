import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { JuegoComponent } from './juego/juego.component';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    JuegoComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
