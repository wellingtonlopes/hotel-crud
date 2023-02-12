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
      this.reservationListPage2.totalCount++;
      this.reservationListPage1.totalCount++;
      return from([200]);
    }

    return throwError(() => new Error('It was not possible to create the reservation. Try again later.'));
  }

  public deleteReservation(id: number): Observable<ReservationResponse> {
    const reservationToBeDeleteOnPage1 = this.reservationListPage1.reservationList.find(reservation => reservation.reservationId === id);
    const reservationToBeDeleteOnPage2 = this.reservationListPage2.reservationList.find(reservation => reservation.reservationId === id);

    if (reservationToBeDeleteOnPage1) {
      this.reservationListPage1.reservationList = this.reservationListPage1.reservationList
        .filter(reservation => reservation.reservationId !== reservationToBeDeleteOnPage1.reservationId);

      if (this.reservationListPage2.reservationList.length) {
        this.reservationListPage1.reservationList.push(this.reservationListPage2.reservationList[0]);
        this.reservationListPage2.reservationList.slice(1, undefined);
      }
    } else if (reservationToBeDeleteOnPage2) {
      this.reservationListPage2.reservationList = this.reservationListPage2.reservationList
        .filter(reservation => reservation.reservationId !== reservationToBeDeleteOnPage2.reservationId);
    } else {
      return throwError(() => new Error('It was not possible to delete the reservation. Try again later.'));
    }

    this.reservationListPage1.totalCount--;
    this.reservationListPage2.totalCount--;

    return from([this.reservationListPage1]);
  }

  public updateReservation(updatedReservation: ReservationInterface): Observable<any> {
    const reservationToBeUpdatedOnPage1 = this.reservationListPage1.reservationList.find(reservation => reservation.reservationId === updatedReservation.reservationId);
    const reservationToBeUpdatedOnPage2 = this.reservationListPage2.reservationList.find(reservation => reservation.reservationId === updatedReservation.reservationId);

    if (reservationToBeUpdatedOnPage1) {
      this.reservationListPage1.reservationList = this.reservationListPage1.reservationList
        .map(reservation => {
          if (reservation.reservationId !== updatedReservation.reservationId) {
            return reservation
          } else {
            reservation.reservedBy = updatedReservation.reservedBy;
            reservation.reservedRoomId = updatedReservation.reservedRoomId;
            reservation.checkInAt = updatedReservation.checkInAt;
            reservation.checkOutAt = updatedReservation.checkOutAt;
            reservation.reservationDoneAt = new Date();
            reservation.hasCheckedIn = updatedReservation.hasCheckedIn;
            reservation.hasCheckedOut = updatedReservation.hasCheckedOut;
            reservation.canceledReservationAt = updatedReservation.canceledReservationAt;
            return reservation;
          }
        });
    } else if (reservationToBeUpdatedOnPage2) {
      this.reservationListPage2.reservationList = this.reservationListPage2.reservationList
        .map(reservation => {
          if (reservation.reservationId !== updatedReservation.reservationId) {
            return reservation
          } else {
            reservation.reservedBy = updatedReservation.reservedBy;
            reservation.reservedRoomId = updatedReservation.reservedRoomId;
            reservation.checkInAt = updatedReservation.checkInAt;
            reservation.checkOutAt = updatedReservation.checkOutAt;
            reservation.reservationDoneAt = new Date();
            return reservation;
          }
        });
    } else {
      return throwError(() => new Error('It was not possible to update the reservation. Try again later.'));
    }

    return from([200]);
  }
}
