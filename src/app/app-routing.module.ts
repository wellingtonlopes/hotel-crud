import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { Constants } from './shared/contants';

const routes: Routes = [
  {
    path: Constants.PATH.HOME,
    component: HomeComponent
  },
  {
    path: Constants.PATH.ROOMS,
    loadChildren: () => import('./components/rooms/rooms.module').then((m) => m.RoomsModule)
  },
  {
    path: Constants.PATH.REPORTS,
    loadChildren: () => import('./components/reports/reports.module').then((m) => m.ReportsModule)
  },
  {
    path: Constants.PATH.CLIENTS,
    loadChildren: () => import('./components/clients/clients.module').then((m) => m.ClientsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
