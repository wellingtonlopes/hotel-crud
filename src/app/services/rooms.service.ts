import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';

import { MOCKED_ROOMS_PAGE_1, MOCKED_ROOMS_PAGE_2, MOCKED_ROOMS_PAGE_3 } from '../shared/mock-database';
import { RoomInterface, RoomResponseInterface, RoomsForSelect, RoomTypeEnum } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})

export class RoomsService {
  private roomsPage1: RoomResponseInterface;
  private roomsPage2: RoomResponseInterface;
  private roomsPage3: RoomResponseInterface;

  constructor() {
    this.roomsPage1 = JSON.parse(MOCKED_ROOMS_PAGE_1) as RoomResponseInterface;
    this.roomsPage2 = JSON.parse(MOCKED_ROOMS_PAGE_2) as RoomResponseInterface;
    this.roomsPage3 = JSON.parse(MOCKED_ROOMS_PAGE_3) as RoomResponseInterface;
  }

  public getRooms(pageIndex: number): Observable<RoomResponseInterface> {
    switch (pageIndex) {
      case 0:
        return from([this.roomsPage1]);
      case 1:
        return from([this.roomsPage2]);
      case 2:
        return from([this.roomsPage3]);
      default:
        return throwError(() => new Error("Page index out of bounds"));
    }
  }

  getFilteredRooms(filter: string): Observable<RoomResponseInterface> {
    if (filter === 'ALL') {
      return this.getRooms(0);
    }

    const roomPageList = [this.roomsPage1, this.roomsPage2, this.roomsPage3];
    const filteredRooms = roomPageList.map(page => {
      return page.roomList.filter(room => room.roomType === filter);
    }).flat(2);

    return from([{
      roomList: filteredRooms,
      totalCount: filteredRooms.length
    }]);
  }

  public getRoomQuantity(roomType: RoomTypeEnum): Observable<number> {
    const roomPageList = [this.roomsPage1, this.roomsPage2, this.roomsPage3];
    const numberOfRooms = roomPageList
      .map(page => {
        return page.roomList.filter(room => room.roomType === roomType);
      })
      .reduce((acc, currentPageArray) => acc + currentPageArray.length, 0);

    return from([numberOfRooms]);
  }

  public getAllRoomsForSelect(): Observable<RoomsForSelect[]> {
    const roomPageList = [this.roomsPage1, this.roomsPage2, this.roomsPage3];
    const roomsForListing = roomPageList.map(page => {
      return page.roomList.map(room => {
        return { roomName: room.roomType, roomId: room.roomId, roomNumber: room.roomNumber } as RoomsForSelect;
      })
    }).flat(2);

    return from([roomsForListing]);
  }

  public addRoom(room: RoomInterface): Observable<any> {
    if (room.roomId !== 1000) {
      this.roomsPage3.roomList.push(room);
      this.roomsPage1.totalCount++
      this.roomsPage2.totalCount++
      this.roomsPage3.totalCount++
      return from([200]);
    }

    return throwError(() => new Error('It was not possible to create the room. Try again later.'));
  }
}
