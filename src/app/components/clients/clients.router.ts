import { Routes, RouterModule } from '@angular/router';
import { Constants } from 'src/app/shared/contants';
import { ClientsDetailsComponent } from './clients-details/clients-details.component';

import { ClientsComponent } from './clients.component';

const CLIENTS_ROUTER: Routes = [
  {
    path: '',
    component: ClientsComponent
  },
  {
    path: Constants.PATH.ID_PARAMETER,
    component: ClientsDetailsComponent
  }
];

export const clientRouter = RouterModule.forChild(CLIENTS_ROUTER);
