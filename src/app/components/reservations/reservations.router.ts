import { Routes, RouterModule } from '@angular/router';
import { Constants } from 'src/app/shared/contants';
import { ReservationsDetailsComponent } from './reservations-details/reservations-details.component';

import { ReservationsComponent } from './reservations.component';

const RESERVATIONS_ROUTER: Routes = [
  {
    path: '',
    component: ReservationsComponent
  },
  {
    path: Constants.PATH.ID_PARAMETER,
    component: ReservationsDetailsComponent
  }
];

export const reservationRouter = RouterModule.forChild(RESERVATIONS_ROUTER);
