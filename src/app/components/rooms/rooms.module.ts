import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { RoomsComponent } from './rooms.component';
import { roomsRouter } from './rooms.router';
import { RoomDetailsDialogComponent } from './room-details-dialog/room-details-dialog.component';
import { RoomsService } from 'src/app/services/rooms.service';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    RoomsComponent,
    RoomDetailsDialogComponent,
    RoomsAddComponent
  ],
  imports: [
    CommonModule,
    roomsRouter,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    SharedComponentsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [
    RoomsService
  ]
})

export class RoomsModule { }
