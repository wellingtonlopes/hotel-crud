import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { RoomInterface, RoomTypeEnum } from 'src/app/interfaces/room.interface';
import { RoomsService } from 'src/app/services/rooms.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Constants } from 'src/app/shared/contants';

@Component({
  selector: 'app-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss']
})
export class RoomsAddComponent implements OnInit {
  public roomForm!: FormGroup;
  public roomTypes!: RoomTypeEnum[];

  private availableRoomIds = [999, 998];

  constructor(private formBuilder: FormBuilder, private router: Router, private roomsService: RoomsService, private snackbarService: SnackbarService) {
    this.roomTypes = Object.values(RoomTypeEnum);
  }

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group({
      roomNumber: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
      roomType: ['', Validators.required],
      roomPrice: ['', [Validators.required, Validators.min(1)]],
    })
  }

  public onSubmit(): void {
    const roomRequest: RoomInterface = {
      roomId: this.availableRoomIds.length > 0 ? this.availableRoomIds.pop()! : 1000,
      roomNumber: this.roomForm.controls['roomNumber'].value,
      roomType: this.roomForm.controls['roomType'].value,
      price: this.roomForm.controls['roomPrice'].value,
      reservation: []
    }

    this.roomsService.addRoom(roomRequest).pipe(first()).subscribe({
      next: () => {
        this.snackbarService.showSnackbarSuccess('Accomodation was added to room list with success!');
        this.cancel()
      },
      error: error => {
        this.snackbarService.showSnackbarError(error);
      }
    });
  }

  public cancel(): void {
    this.router.navigate([Constants.PATH.ROOMS]);
  }
}
