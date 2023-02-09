import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { ReportsComponent } from './reports.component';
import { reportsModule } from './reports.router';
import { ReportsService } from 'src/app/services/reports.service';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    reportsModule,
    NgChartsModule,
    SharedComponentsModule,
  ],
  providers: [
    ReportsService
  ]
})
export class ReportsModule { }
