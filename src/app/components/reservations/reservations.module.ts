import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { ReservationsComponent } from './reservations.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ReservationsComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    MatTableModule,
    CommonModule
    MatIconModule,
    MatButtonModule,
  ]
})
export class ReservationsModule { }
