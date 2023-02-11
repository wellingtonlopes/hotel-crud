import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';

import { ReservationInterface, ReservationResponse } from '../interfaces/reservation.interface';
import { MOCKED_RESERVATIONS_PAGE_1, MOCKED_RESERVATIONS_PAGE_2 } from '../shared/mock-database';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private reservationListPage1: ReservationResponse;
  private reservationListPage2: ReservationResponse;

  constructor() {
    this.reservationListPage1 = JSON.parse(MOCKED_RESERVATIONS_PAGE_1) as ReservationResponse;
    this.reservationListPage2 = JSON.parse(MOCKED_RESERVATIONS_PAGE_2) as ReservationResponse;
  }

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

  public createReservation(reservation: ReservationInterface): Observable<any> {
    if (reservation.reservationId !== 1000) {
      this.reservationListPage2.reservationList.push(reservation);
      return from([200]);
    }

    return throwError(() => new Error('It was not possible to create the reservation. Try again later.'));
  }
}
