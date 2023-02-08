import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';

import { RoomsComponent } from './rooms.component';
import { roomsRouter } from './rooms.router';
import { RoomDetailsDialogComponent } from './room-details-dialog/room-details-dialog.component';

@NgModule({
  declarations: [
    RoomsComponent,
    RoomDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    roomsRouter,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
  ]
})

export class RoomsModule { }
