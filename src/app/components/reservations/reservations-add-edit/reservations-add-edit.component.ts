import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';

import { ClientInterface } from 'src/app/interfaces/client.interface';
import { ReservationInterface } from 'src/app/interfaces/reservation.interface';
import { RoomsForSelect } from 'src/app/interfaces/room.interface';
import { ClientsService } from 'src/app/services/clients.service';
import { ReservationsService } from 'src/app/services/reservations.service';
import { RoomsService } from 'src/app/services/rooms.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Constants } from 'src/app/shared/contants';

@Component({
  selector: 'app-reservations-add-edit',
  templateUrl: './reservations-add-edit.component.html',
  styleUrls: ['./reservations-add-edit.component.scss']
})
export class ReservationsAddEditComponent implements OnInit {
  public clientList!: ClientInterface[];
  public filteredClients!: ClientInterface[];
  public roomList!: RoomsForSelect[];
  public reservationForm!: FormGroup;
  private reservationIds = [999];

  constructor(
    private roomsService: RoomsService,
    private clientsService: ClientsService,
    private formBuilder: FormBuilder,
    private reservationsService: ReservationsService,
    private snackbarService: SnackbarService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.roomsService.getAllRoomsForSelect().pipe(first()).subscribe(response => {
      this.roomList = response;
    })

    this.getAutocompleteOptions('');

    this.reservationForm = this.formBuilder.group({
      reservedRoomId: [null, Validators.required],
      reservedBy: [null, Validators.required],
      checkInAt: ['', Validators.required],
      checkOutAt: ['', Validators.required]
    });
  }

  public onInput(event: Event) {
    const searchString = (event.target as HTMLInputElement).value;

    this.getAutocompleteOptions(searchString);
  }

  public autocompleteDisplayItem(value?: number): string {
    const firstName = this.filteredClients.find(client => client.clientId === value)?.firstName;
    const lastName = this.filteredClients.find(client => client.clientId === value)?.lastName;

    if (!firstName || !lastName) {
      return '';
    }

    return `${firstName} ${lastName}`;
  }

  public onSubmit(): void {
    const reservationRequest: ReservationInterface = this.setReservationObject()

    this.reservationsService.createReservation(reservationRequest).pipe(first()).subscribe({
      next: () => {
        this.snackbarService.showSnackbarSuccess('Reservation saved with success!');
        this.router.navigate([`${Constants.PATH.RESERVATIONS}`]);
      },
      error: (error) => {
        this.snackbarService.showSnackbarError(error);
      }
    });
  }

  private setReservationObject(): ReservationInterface {
    return {
      reservationId: this.reservationIds.length > 0 ? this.reservationIds.pop()! : 1000,
      reservationDoneAt: new Date(),
      checkInAt: this.reservationForm.controls['checkInAt'].value,
      checkOutAt: this.reservationForm.controls['checkOutAt'].value,
      hasCheckedIn: false,
      hasCheckedOut: false,
      canceledReservationAt: null,
      reservedRoomId: this.reservationForm.controls['reservedRoomId'].value,
      reservedBy: this.reservationForm.controls['reservedBy'].value
    };
  }

  private getAutocompleteOptions(searchString: string) {
    this.clientsService.searchClients(searchString).pipe(first()).subscribe(response => {
      this.filteredClients = response;
    });
  }
}
