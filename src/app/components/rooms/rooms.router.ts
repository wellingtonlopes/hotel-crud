import { Routes, RouterModule } from '@angular/router';
import { Constants } from 'src/app/shared/contants';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';

import { RoomsComponent } from './rooms.component';

const ROOMS_ROUTER: Routes = [
  {
    path: '',
    component: RoomsComponent
  },
  {
    path: Constants.PATH.CREATE_ROOM,
    component: RoomsAddComponent
  }
];

export const roomsRouter = RouterModule.forChild(ROOMS_ROUTER);
