import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsComponent } from './reports.component';
import { reportsModule } from './reports.router';

@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    reportsModule,
  ]
})
export class ReportsModule { }
