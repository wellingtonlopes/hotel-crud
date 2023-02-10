import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { ReservationsComponent } from './reservations.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { reservationRouter } from './reservations.router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReservationsDetailsComponent } from './reservations-details/reservations-details.component';



@NgModule({
  declarations: [
    ReservationsComponent,
    ReservationsDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    MatTableModule,
    reservationRouter,
    MatIconModule,
    MatButtonModule,
  ]
})
export class ReservationsModule { }
