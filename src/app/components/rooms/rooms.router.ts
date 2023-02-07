import { Routes, RouterModule } from '@angular/router';

import { RoomsComponent } from './rooms.component';

const ROOMS_ROUTER: Routes = [
  {
    path: '',
    component: RoomsComponent
  }
];

export const roomsRouter = RouterModule.forChild(ROOMS_ROUTER);
