import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";

import { ReservationInterface } from "src/app/interfaces/reservation.interface";

export class ReservationsSource implements DataSource<ReservationInterface> {
  private reservationsSubject = new BehaviorSubject<ReservationInterface[]>([]);

  public connect(collectionViewer: CollectionViewer): Observable<readonly ReservationInterface[]> {
    return this.reservationsSubject.asObservable();
  }

  public disconnect(collectionViewer: CollectionViewer): void {
    this.reservationsSubject.complete();
  }

  public loadReservations(reservations: ReservationInterface[]) {
    this.reservationsSubject.next(reservations);
  }
}