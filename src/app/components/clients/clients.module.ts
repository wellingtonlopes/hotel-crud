import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ClientsComponent } from './clients.component';
import { clientRouter } from './clients.router';
import { InnerHeaderComponent } from '../shared-components/inner-header/inner-header.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { ClientsDetailsComponent } from './clients-details/clients-details.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ClientsComponent,
    ClientsDetailsComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    clientRouter,
    MatPaginatorModule,
    SharedComponentsModule,
    MatIconModule,
  ]
})
export class ClientsModule { }
