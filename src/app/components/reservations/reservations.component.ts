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
  public readonly displayedColumns: string[] = ['id', 'reserved-by', 'reserved-at', 'actions'];

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

  public deleteElement(reservationId: number): void {
    //DELETE OBJECT --- TO BE IMPLEMENTED ---
  }

  private getPaginatedReservations(pageIndex: number) {
    this.reservationsService.getReservations(pageIndex).pipe(first()).subscribe(response => {
      this.reservationList = response.reservationList;
      this.totalCount = response.totalCount;
      this.reservationsDataSource.loadReservations(this.reservationList);
    });
  }
}
