import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs';

import { RoomInterface, RoomTypeEnum } from 'src/app/interfaces/room.interface';
import { RoomsService } from 'src/app/services/rooms.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Constants } from 'src/app/shared/contants';
import { RoomDetailsDialogComponent } from './room-details-dialog/room-details-dialog.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  public roomList!: RoomInterface[];
  public totalRooms!: number;
  public pageIndex = Constants.FIRST_PAGE;
  public currentTotalRooms!: number;
  public singleRoomsTotal!: number;
  public doubleRoomsTotal!: number;
  public deluxeRoomsTotal!: number;
  public suitesTotal!: number;
  public presidentialSuitesTotal!: number;
  public readonly pageSize = 4;
  public readonly hasAddButton = true;

  constructor(private roomsService: RoomsService, private dialog: MatDialog, private router: Router, private snackbarService: SnackbarService) { }

  public ngOnInit(): void {
    this.getPaginatedRooms(this.pageIndex);
    this.setFiltersQuantities();
  }

  public openDetailsDialog(room: RoomInterface): void {
    this.dialog.open(RoomDetailsDialogComponent, {
      data: {
        roomNumber: room.roomNumber,
        roomPrice: room.price,
        reservedBy: room.reservation.length > 0 ? room.reservation[room.reservation.length - 1].reservedBy : '',
        roomType: room.roomType
      }
    });
  }

  public changePage(event: number): void {
    this.getPaginatedRooms(event);
    this.pageIndex = event;
  }

  public filterList(filterBy: string) {
    this.roomsService.getFilteredRooms(filterBy).pipe(first()).subscribe(response => {
      this.roomList = response.roomList;
      this.currentTotalRooms = response.totalCount;
    })
  }

  public createRoom(): void {
    this.router.navigate([`${Constants.PATH.ROOMS}/${Constants.PATH.CREATE_ROOM}`]);
  }

  public delete(id: number): void {
    this.roomsService.deleteRoom(id).pipe(first()).subscribe({
      next: response => {
        this.roomList = response.roomList;
        this.totalRooms = response.totalCount;
        this.currentTotalRooms = this.totalRooms;
        this.pageIndex = Constants.FIRST_PAGE;
        this.setFiltersQuantities();
        this.snackbarService.showSnackbarSuccess('Reservation was deleted with success!');
      },
      error: error => {
        this.snackbarService.showSnackbarError(error);
      }
    });
  }

  private getPaginatedRooms(pageIndex: number) {
    this.roomsService.getRooms(pageIndex).pipe(first()).subscribe(response => {
      this.roomList = response.roomList;
      this.totalRooms = response.totalCount;
      this.currentTotalRooms = this.totalRooms;
    });
  }

  private setFiltersQuantities() {
    this.roomsService.getRoomQuantity(RoomTypeEnum.SINGLE_ROOM).pipe(first()).subscribe(response => this.singleRoomsTotal = response);
    this.roomsService.getRoomQuantity(RoomTypeEnum.DOUBLE_ROOM).pipe(first()).subscribe(response => this.doubleRoomsTotal = response);
    this.roomsService.getRoomQuantity(RoomTypeEnum.DELUXE_ROOM).pipe(first()).subscribe(response => this.deluxeRoomsTotal = response);
    this.roomsService.getRoomQuantity(RoomTypeEnum.SUITE).pipe(first()).subscribe(response => this.suitesTotal = response);
    this.roomsService.getRoomQuantity(RoomTypeEnum.PRESIDENTIAL_SUITE).pipe(first()).subscribe(response => this.presidentialSuitesTotal = response);
  }
}
