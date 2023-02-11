import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';

import { ReservationInterface } from 'src/app/interfaces/reservation.interface';
import { ReservationsService } from 'src/app/services/reservations.service';
import { Constants } from 'src/app/shared/contants';
import { ReservationsSource } from './reservations-data-source';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  public reservationsDataSource = new ReservationsSource();
  public totalCount!: number;
  public readonly pageSize = 5;
  public readonly hasAddFunctionality = true;
  public readonly displayedColumns: string[] = ['id', 'reserved-by', 'reserved-at', 'status', 'actions'];

  private reservationList!: ReservationInterface[];

  constructor(private readonly reservationsService: ReservationsService, private router: Router) { }

  ngOnInit(): void {
    this.getPaginatedReservations(Constants.FIRST_PAGE);
  }

  public changePage(event: number): void {
    this.getPaginatedReservations(event);
  }

  public goToElementDetails(reservationId: number): void {
    this.router.navigate([`${Constants.PATH.RESERVATIONS}/${reservationId}`]);
  }

  public getReservationStatus(element: ReservationInterface): string {
    let status: string | undefined = '';
    const hasCanceled = element.canceledReservationAt !== null;
    const possibleStatusMap = new Map<string, string>([
      ['hasCheckedIn', 'Checked In'],
      ['hasCheckedOut', 'Checked Out'],
    ]);

    Object.keys(element).forEach(key => {
      if (element[key as keyof ReservationInterface] === true) {
        status = key;
      }
    });

    if (status === '' && hasCanceled) {
      return 'Canceled';
    } else if (status === '') {
      return 'Ok'
    }

    status = possibleStatusMap.get(status);
    return status ? status : '';
  }

  public deleteElement(reservationId: number): void {
    //DELETE OBJECT --- TO BE IMPLEMENTED ---
  }

  public goToCreateReservation(): void {
    this.router.navigate([`${Constants.PATH.RESERVATIONS}/${Constants.PATH.CREATE_RESERVATION}`]);
  }

  private getPaginatedReservations(pageIndex: number) {
    this.reservationsService.getReservations(pageIndex).pipe(first()).subscribe(response => {
      this.reservationList = response.reservationList;
      this.totalCount = response.totalCount;
      this.reservationsDataSource.loadReservations(this.reservationList);
    });
  }
}
