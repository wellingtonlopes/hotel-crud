import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ReservationsComponent } from './reservations.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { reservationRouter } from './reservations.router';
import { ReservationsDetailsComponent } from './reservations-details/reservations-details.component';
import { ReservationsAddEditComponent } from './reservations-add-edit/reservations-add-edit.component';

@NgModule({
  declarations: [
    ReservationsComponent,
    ReservationsDetailsComponent,
    ReservationsAddEditComponent,
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    MatTableModule,
    reservationRouter,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatSnackBarModule,
  ]
})
export class ReservationsModule { }
