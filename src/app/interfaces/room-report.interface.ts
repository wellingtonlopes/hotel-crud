export interface RoomReport {
  data: number[],
  dataSet: RoomChartSetEnum
}

export interface RoomReportResponse {
  roomReports: RoomReport[]
}

export enum RoomChartSetEnum {
  RESERVED_ROOMS = 'Reserved Rooms',
  CHECKED_IN_ROOMS = 'Checked In Rooms',
  CANCELED_RESERVATION_ROOMS = 'Rooms With Canceled Reservations',
  NOT_RESERVED_ROOMS = 'Rooms With No Reservation'
}