import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';

import { ClientInterface } from 'src/app/interfaces/client.interface';
import { ReservationInterface } from 'src/app/interfaces/reservation.interface';
import { RoomsForSelect } from 'src/app/interfaces/room.interface';
import { ClientsService } from 'src/app/services/clients.service';
import { DateFormatService } from 'src/app/services/date-format.service';
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
  public filteredClients!: ClientInterface[];
  public roomList!: RoomsForSelect[];
  public reservationForm!: FormGroup;
  public idParameter: number | null;
  public statusList = ['Confirmed', 'Checked In', 'Checked Out', 'Canceled'];

  private reservationIds = [999, 998];
  private reservationToBeEdited!: ReservationInterface;

  constructor(
    private roomsService: RoomsService,
    private clientsService: ClientsService,
    private formBuilder: FormBuilder,
    private reservationsService: ReservationsService,
    private snackbarService: SnackbarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetection: ChangeDetectorRef,
    private dateFormatService: DateFormatService,
    @Inject(MAT_DATE_FORMATS) private dateFormatData: any,
  ) {
    this.idParameter = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.createFormAndSetInitialProperties();

    if (this.idParameter) {
      this.setFormEditingValues(this.idParameter);
    }

    this.dateFormatService.listenToDateFormat().subscribe(dateFormat => {
      this.setDateFormatForDatePicker(dateFormat);
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

  public onUpdate(): void {
    const reservationRequest: ReservationInterface = this.setReservationObject()

    this.reservationsService.updateReservation(reservationRequest).pipe(first()).subscribe({
      next: () => {
        this.snackbarService.showSnackbarSuccess('Reservation updated with success!');
        this.router.navigate([`${Constants.PATH.RESERVATIONS}`]);
      },
      error: (error) => {
        this.snackbarService.showSnackbarError(error);
      }
    });
  }

  public cancel(): void {
    this.router.navigate([`${Constants.PATH.RESERVATIONS}`]);
  }

  public getDateFormatString(): string {
    if (this.dateFormatData.display.dateInput === Constants.DATE_FORMATS.YYYYMMDD.display.dateInput) {
      return 'YYYY/MM/DD – YYYY/MM/DD';
    } else if (this.dateFormatData.display.dateInput === Constants.DATE_FORMATS.DDMMYYY.display.dateInput) {
      return 'DD/MM/YYYY – DD/MM/YYYY';
    }
    return '';
  }

  private setReservationObject(): ReservationInterface {
    const clientForReservation = this.filteredClients.find(client => client.clientId === this.reservationForm.controls['reservedBy'].value);
    const newReservation: ReservationInterface = {
      reservationDoneAt: new Date(),
      checkInAt: this.reservationForm.controls['checkInAt'].value,
      checkOutAt: this.reservationForm.controls['checkOutAt'].value,
      hasCheckedIn: this.reservationForm.controls['status'].value === this.statusList[1] || this.reservationForm.controls['status'].value === this.statusList[2],
      hasCheckedOut: this.reservationForm.controls['status'].value === this.statusList[2],
      canceledReservationAt: this.reservationForm.controls['status'].value === this.statusList[3] ? new Date() : null,
      reservedRoomId: this.reservationForm.controls['reservedRoomId'].value,
      reservedBy: clientForReservation!
    };

    if (!this.idParameter) {
      newReservation.reservationId = ReservationsService.lastUsedReservationId + 1;
    } else {
      newReservation.reservationId = this.idParameter;
    }

    return newReservation;
  }

  private getAutocompleteOptions(searchString: string) {
    this.clientsService.searchClients(searchString).pipe(first()).subscribe(response => {
      this.filteredClients = response;
    });
  }

  private setFormEditingValues(id: number): void {
    this.reservationsService.getReservationById(id).pipe(first()).subscribe(response => {
      this.reservationToBeEdited = response;
      this.reservationForm.patchValue({
        reservedRoomId: this.reservationToBeEdited.reservedRoomId,
        reservedBy: this.reservationToBeEdited.reservedBy.clientId,
        checkInAt: this.reservationToBeEdited.checkInAt,
        checkOutAt: this.reservationToBeEdited.checkOutAt,
        status: this.getReservationStatus(this.reservationToBeEdited)
      });
    });
  }

  private getReservationStatus(reservation: ReservationInterface): string {
    let status: string | undefined = '';
    const hasCanceled = reservation.canceledReservationAt !== null;
    const possibleStatusMap = new Map<string, string>([
      ['hasCheckedIn', this.statusList[1]],
      ['hasCheckedOut', this.statusList[2]],
    ]);

    Object.keys(reservation).forEach(key => {
      if (reservation[key as keyof ReservationInterface] === true) {
        status = key;
      }
    });

    if (status === '' && hasCanceled) {
      return this.statusList[3];
    } else if (status === '') {
      return this.statusList[0]
    }

    status = possibleStatusMap.get(status);
    return status ? status : '';
  }

  private createFormAndSetInitialProperties() {
    this.getAutocompleteOptions('');
    this.roomsService.getAllRoomsForSelect().pipe(first()).subscribe(response => {
      this.roomList = response;
    });

    this.reservationForm = this.formBuilder.group({
      reservedRoomId: [null, Validators.required],
      reservedBy: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      checkInAt: ['', Validators.required],
      checkOutAt: ['', Validators.required],
      status: ['']
    });
  }

  /*
    Setting the entire object for the injectioned dateFormatData with the existing 'Constants.DATE_FORMATS.(...)' constant does not work.
    So it is necessary to set its properties step by step.
  */
  private setDateFormatForDatePicker(dateFormat: string): void {
    const year = Constants.DATE_FORMATS.YYYYMMDD.parse.dateInput;
    const day = Constants.DATE_FORMATS.DDMMYYY.parse.dateInput;
    if (dateFormat === year) {
      this.dateFormatData.parse.dateInput = Constants.DATE_FORMATS.YYYYMMDD.parse.dateInput;
      this.dateFormatData.display.dateInput = Constants.DATE_FORMATS.YYYYMMDD.display.dateInput;
      this.dateFormatData.display.monthYearLabel = Constants.DATE_FORMATS.YYYYMMDD.display.monthYearLabel;
      this.dateFormatData.display.dateA11yLabel = Constants.DATE_FORMATS.YYYYMMDD.display.dateA11yLabel;
      this.dateFormatData.display.monthYearA11yLabel = Constants.DATE_FORMATS.YYYYMMDD.display.monthYearA11yLabel;
    } else if (dateFormat === day) {
      this.dateFormatData.parse.dateInput = Constants.DATE_FORMATS.DDMMYYY.parse.dateInput;
      this.dateFormatData.display.dateInput = Constants.DATE_FORMATS.DDMMYYY.display.dateInput;
      this.dateFormatData.display.monthYearLabel = Constants.DATE_FORMATS.DDMMYYY.display.monthYearLabel;
      this.dateFormatData.display.dateA11yLabel = Constants.DATE_FORMATS.DDMMYYY.display.dateA11yLabel;
      this.dateFormatData.display.monthYearA11yLabel = Constants.DATE_FORMATS.DDMMYYY.display.monthYearA11yLabel;
    }
  }
}
