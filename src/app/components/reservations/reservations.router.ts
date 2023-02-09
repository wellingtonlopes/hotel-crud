import { Routes, RouterModule } from '@angular/router';

import { ReservationsComponent } from './reservations.component';

const RESERVATIONS_ROUTER: Routes = [
  {
    path: '',
    component: ReservationsComponent
  }
];

export const reservationRouter = RouterModule.forChild(RESERVATIONS_ROUTER);
