import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { RoomChartSetEnum, RoomReportResponse } from '../interfaces/room-report.interface';
import data from './../shared/mocked-reports-data.json'

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private dataFromJson;

  constructor() {
    this.dataFromJson = data;
  }

  public getRoomReports(): Observable<RoomReportResponse> {
    const chartDataSets: RoomReportResponse = {
      roomReports: [
        { data: this.dataFromJson.data.reservedRooms, dataSet: RoomChartSetEnum.RESERVED_ROOMS },
        { data: this.dataFromJson.data.checkedInRooms, dataSet: RoomChartSetEnum.CHECKED_IN_ROOMS },
        { data: this.dataFromJson.data.canceledReservationRooms, dataSet: RoomChartSetEnum.CANCELED_RESERVATION_ROOMS },
        { data: this.dataFromJson.data.notReservedRooms, dataSet: RoomChartSetEnum.NOT_RESERVED_ROOMS }
      ]
    };

    return from([chartDataSets]);
  }
}
