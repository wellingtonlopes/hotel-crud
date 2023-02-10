import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { ReservationInterface } from 'src/app/interfaces/reservation.interface';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-reservations-details',
  templateUrl: './reservations-details.component.html',
  styleUrls: ['./reservations-details.component.scss']
})
export class ReservationsDetailsComponent implements OnInit {
  public reservation!: ReservationInterface;

  private idParameter: number | null;

  constructor(private reservationsService: ReservationsService, private activatedRoute: ActivatedRoute) {
    this.idParameter = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.idParameter) {
      this.reservationsService.getReservationById(this.idParameter).pipe(first()).subscribe(response => {
        this.reservation = response;
      })
    }
  }
}
