import { ClientInterface } from "./client.interface"

export interface ReservationInterface {
  reservationId: number;
  reservationDoneAt: Date;
  checkedInAt: Date | null;
  checkedOutAt: Date | null;
  canceledReservationAt: Date | null;
  reservedBy: ClientInterface;
}
