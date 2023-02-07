import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsComponent } from './rooms.component';
import { roomsRouter } from './rooms.router';

@NgModule({
  declarations: [
    RoomsComponent
  ],
  imports: [
    CommonModule,
    roomsRouter,
  ]
})

export class RoomsModule { }
