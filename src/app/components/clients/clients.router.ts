import { Routes, RouterModule } from '@angular/router';

import { ClientsComponent } from './clients.component';

const CLIENTS_ROUTER: Routes = [
  {
    path: '',
    component: ClientsComponent
];

export const clientRouter = RouterModule.forChild(CLIENTS_ROUTER);
