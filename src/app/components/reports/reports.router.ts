import { Routes, RouterModule } from '@angular/router';

import { ReportsComponent } from './reports.component';

const REPORTS_ROUTER: Routes = [
  {
    path: '',
    component: ReportsComponent
  }
];

export const reportsModule = RouterModule.forChild(REPORTS_ROUTER);
