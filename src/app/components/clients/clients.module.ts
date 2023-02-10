import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { ClientsComponent } from './clients.component';
import { clientRouter } from './clients.router';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { ClientsDetailsComponent } from './clients-details/clients-details.component';



@NgModule({
  declarations: [
    ClientsComponent,
    ClientsDetailsComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    clientRouter,
    SharedComponentsModule,
    MatIconModule,
  ]
})
export class ClientsModule { }
