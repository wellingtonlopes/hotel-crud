import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { ReportsComponent } from './reports.component';
import { reportsModule } from './reports.router';
import { ReportsService } from 'src/app/services/reports.service';

@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    reportsModule,
    NgChartsModule,
  ],
  providers: [
    ReportsService
  ]
})
export class ReportsModule { }
