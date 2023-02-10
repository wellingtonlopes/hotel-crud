import { ClientInterface } from "./client.interface"

export interface ReservationInterface {
  reservationId: number;
  reservationDoneAt: Date;
  checkInAt: Date | null;
  hasCheckedIn: boolean;
  checkOutAt: Date | null;
  hasCheckedOut: boolean;
  canceledReservationAt: Date | null;
  reservedBy: ClientInterface;
}

export interface ReservationResponse {
  reservationList: ReservationInterface[],
  totalCount: number
}
