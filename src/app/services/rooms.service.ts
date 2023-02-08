import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { MOCKED_ROOMS } from '../shared/mock-database';
import { RoomInterface, RoomResponseInterface, RoomTypeEnum } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})

export class RoomsService {
  private roomInterfaceList: RoomInterface[][];
  private totalItemCount!: number;

  constructor() {
    this.roomInterfaceList = JSON.parse(MOCKED_ROOMS) as RoomInterface[][];
    this.totalItemCount = this.roomInterfaceList.reduce((acc, currentPageArray) => acc + currentPageArray.length, 0);
  }

  public getRooms(pageIndex: number): Observable<RoomResponseInterface> {
    switch (pageIndex) {
      case 0:
        const pageResponse1: RoomResponseInterface[] = [{
          roomList: JSON.parse(MOCKED_ROOMS)[0],
          totalCount: this.totalItemCount
        }];
        return from(pageResponse1);

      case 1:
        const pageResponse2: RoomResponseInterface[] = [{
          roomList: JSON.parse(MOCKED_ROOMS)[1],
          totalCount: this.totalItemCount
        }];
        return from(pageResponse2);

      case 2:
        const pageResponse3: RoomResponseInterface[] = [{
          roomList: JSON.parse(MOCKED_ROOMS)[2],
          totalCount: this.totalItemCount
        }];
        return from(pageResponse3);

      default:
        throw new Error("Page index out of bounds");
    }
  }

  getFilteredRooms(filter: string): Observable<RoomResponseInterface> {
    if (filter === 'ALL') {
      return this.getRooms(0);
    }

    const filteredRooms = this.roomInterfaceList.map(page => {
      return page.filter(room => room.roomType === filter);
    }).flat(2);

    return from([{
      roomList: filteredRooms,
      totalCount: filteredRooms.length
    }]);
  }

  public getRoomQuantity(roomType: RoomTypeEnum): Observable<number> {
    const numberOfRooms = this.roomInterfaceList
      .map(page => {
        return page.filter(room => room.roomType === roomType);
      })
      .reduce((acc, currentPageArray) => acc + currentPageArray.length, 0);

    return from([numberOfRooms]);
  }
}
