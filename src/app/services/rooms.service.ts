import { Injectable } from '@angular/core';
import { from, Observable, reduce, throwError } from 'rxjs';
import { MOCKED_ROOMS } from '../components/shared/mock-database';
import { RoomInterface, RoomResponseInterface } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})

export class RoomsService {
  constructor() { }

  getRooms(pageIndex: number): Observable<RoomResponseInterface> {
    const roomInterfaceList = JSON.parse(MOCKED_ROOMS) as RoomInterface[][];
    const totalItemCount = roomInterfaceList.reduce((acc, currentPageArray) => acc + currentPageArray.length, 0);

    switch (pageIndex) {
      case 0:
        const pageResponse1: RoomResponseInterface[] = [{
          roomList: JSON.parse(MOCKED_ROOMS)[0],
          totalCount: totalItemCount
        }];
        return from(pageResponse1);

      case 1:
        const pageResponse2: RoomResponseInterface[] = [{
          roomList: JSON.parse(MOCKED_ROOMS)[1],
          totalCount: totalItemCount
        }];
        return from(pageResponse2);

      case 2:
        const pageResponse3: RoomResponseInterface[] = [{
          roomList: JSON.parse(MOCKED_ROOMS)[2],
          totalCount: totalItemCount
        }];
        return from(pageResponse3);

      default:
        throw new Error("Page index out of bounds");
    }
  }
}
