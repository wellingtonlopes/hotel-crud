import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { first } from 'rxjs';

import { RoomInterface, RoomTypeEnum } from 'src/app/interfaces/room.interface';
import { RoomsService } from 'src/app/services/rooms.service';
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
  public currentTotalRooms!: number;
  public singleRoomsTotal!: number;
  public doubleRoomsTotal!: number;
  public deluxeRoomsTotal!: number;
  public suitesTotal!: number;
  public presidentialSuitesTotal!: number;

  constructor(private roomsService: RoomsService, private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.getRoomsByPage(Constants.FIRST_PAGE);
    this.roomsService.getRoomQuantity(RoomTypeEnum.SINGLE_ROOM).pipe(first()).subscribe(response => this.singleRoomsTotal = response);
    this.roomsService.getRoomQuantity(RoomTypeEnum.DOUBLE_ROOM).pipe(first()).subscribe(response => this.doubleRoomsTotal = response);
    this.roomsService.getRoomQuantity(RoomTypeEnum.DELUXE_ROOM).pipe(first()).subscribe(response => this.deluxeRoomsTotal = response);
    this.roomsService.getRoomQuantity(RoomTypeEnum.SUITE).pipe(first()).subscribe(response => this.suitesTotal = response);
    this.roomsService.getRoomQuantity(RoomTypeEnum.PRESIDENTIAL_SUITE).pipe(first()).subscribe(response => this.presidentialSuitesTotal = response);
  }

  public openDetailsDialog(room: RoomInterface): void {
    this.dialog.open(RoomDetailsDialogComponent, {
      data: {
        roomNumber: room.roomNumber,
        roomPrice: room.price,
        reservedBy: room.reservation?.reservedBy,
        roomType: room.roomType
      }
    });
  }

  public changePage(event: PageEvent): void {
    this.getRoomsByPage(event.pageIndex);
  }

  public filterList(filterBy: string) {
    this.roomsService.getFilteredRooms(filterBy).pipe(first()).subscribe(response => {
      this.roomList = response.roomList;
      this.currentTotalRooms = response.totalCount;
    })
  }

  private getRoomsByPage(pageIndex: number) {
    this.roomsService.getRooms(pageIndex).pipe(first()).subscribe(response => {
      this.roomList = response.roomList;
      this.totalRooms = response.totalCount;
      this.currentTotalRooms = this.totalRooms;
    });
  }
}
