import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { ReservationInterface, ReservationResponse } from '../interfaces/reservation.interface';
import { MOCKED_RESERVATIONS_PAGE_1, MOCKED_RESERVATIONS_PAGE_2 } from '../shared/mock-database';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private reservationListPage1: ReservationResponse = JSON.parse(MOCKED_RESERVATIONS_PAGE_1) as ReservationResponse;
  private reservationListPage2: ReservationResponse = JSON.parse(MOCKED_RESERVATIONS_PAGE_2) as ReservationResponse;

  constructor() { }

  public getReservations(pageIndex: number): Observable<ReservationResponse> {
    return pageIndex === 0 ? from([this.reservationListPage1]) : from([this.reservationListPage2]);
  }

  public getReservationById(id: number): Observable<ReservationInterface> {
    let reservation: ReservationInterface = this.reservationListPage1.reservationList.filter(reservation => reservation.reservationId === id)[0];

    if (!reservation) {
      reservation = this.reservationListPage2.reservationList.filter(reservation => reservation.reservationId === id)[0];
    }

    return from([reservation]);
  }
}
