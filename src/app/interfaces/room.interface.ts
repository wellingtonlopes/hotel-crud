import { ReservationInterface } from "./reservation.interface";

export interface RoomInterface {
  roomId: number;
  roomNumber: number;
  roomType: RoomTypeEnum;
  reservation: ReservationInterface | null;
  price: number;
}

export enum RoomTypeEnum {
  SINGLE_ROOM = 'Single Room',
  DOUBLE_ROOM = 'Double Room',
  DELUXE_ROOM = 'Deluxe Room',
  SUITE = 'Suite',
  PRESIDENTIAL_SUITE = 'Presidential Suite'
}

export interface RoomResponseInterface {
  roomList: RoomInterface[];
  totalCount: number;
}