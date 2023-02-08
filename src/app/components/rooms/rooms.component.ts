import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { first } from 'rxjs';

import { RoomInterface } from 'src/app/interfaces/room.interface';
import { RoomsService } from 'src/app/services/rooms.service';
import { RoomDetailsDialogComponent } from './room-details-dialog/room-details-dialog.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  public roomList!: RoomInterface[];
  public totalRooms!: number;

  private readonly FIRST_PAGE = 0;

  constructor(private roomsService: RoomsService, private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.getRoomsByPage(this.FIRST_PAGE);
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


  private getRoomsByPage(pageIndex: number) {
    this.roomsService.getRooms(pageIndex).pipe(first()).subscribe(response => {
      this.roomList = response.roomList;
      this.totalRooms = response.totalCount;
    });
  }
}
