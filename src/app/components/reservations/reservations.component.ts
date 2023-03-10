import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, Subscription } from 'rxjs';
import * as dayjs from 'dayjs';

import { ReservationInterface, ReservationResponse } from 'src/app/interfaces/reservation.interface';
import { ReservationsService } from 'src/app/services/reservations.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Constants } from 'src/app/shared/contants';
import { ReservationsSource } from './reservations-data-source';
import { DateFormatService } from 'src/app/services/date-format.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit, OnDestroy {
  public reservationsDataSource = new ReservationsSource();
  public totalCount!: number;
  public pageIndex: number = Constants.FIRST_PAGE;
  public readonly pageSize = 5;
  public readonly hasAddFunctionality = true;
  public readonly displayedColumns: string[] = ['id', 'reserved-by', 'reserved-at', 'status', 'actions'];

  private reservationList!: ReservationInterface[];
  private currentDateFormat!: string;
  private subscriptions = new Subscription();

  constructor(private readonly reservationsService: ReservationsService, private router: Router, private snackbarService: SnackbarService, private dateFormatService: DateFormatService) { }

  ngOnInit(): void {
    this.getPaginatedReservations(this.pageIndex);
    this.subscriptions.add(this.dateFormatService.listenToDateFormat().subscribe(dateFormat => this.currentDateFormat = dateFormat));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public changePage(event: number): void {
    this.getPaginatedReservations(event);
    this.pageIndex = event;
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
      return 'Confirmed'
    }

    status = possibleStatusMap.get(status);
    return status ? status : '';
  }

  public deleteElement(reservationId: number): void {
    this.reservationsService.deleteReservation(reservationId).pipe(first()).subscribe({
      next: response => {
        this.setTableProperties(response);
        this.pageIndex = Constants.FIRST_PAGE;
        this.snackbarService.showSnackbarSuccess('Reservation was deleted with success!')
      },
      error: error => {
        this.snackbarService.showSnackbarError(error);
      }
    })
  }

  public editElement(reservationId: number): void {
    this.router.navigate([`${Constants.PATH.RESERVATIONS}/${Constants.PATH.EDIT_RESERVATION}/${reservationId}`]);
  }

  public goToCreateReservation(): void {
    this.router.navigate([`${Constants.PATH.RESERVATIONS}/${Constants.PATH.CREATE_RESERVATION}`]);
  }

  public formatDate(date: string): string {
    return dayjs(date).format(this.currentDateFormat);
  }

  private getPaginatedReservations(pageIndex: number) {
    this.reservationsService.getReservations(pageIndex).pipe(first()).subscribe(response => {
      this.setTableProperties(response);
    });
  }

  private setTableProperties(response: ReservationResponse) {
    this.reservationList = response.reservationList;
    this.totalCount = response.totalCount;
    this.reservationsDataSource.loadReservations(this.reservationList);
  }
}
