import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";

import { ClientInterface } from "src/app/interfaces/client.interface";

export class ClientsSource implements DataSource<ClientInterface> {
  private clienstSubject = new BehaviorSubject<ClientInterface[]>([]);

  public connect(collectionViewer: CollectionViewer): Observable<readonly ClientInterface[]> {
    return this.clienstSubject.asObservable();
  }

  public disconnect(collectionViewer: CollectionViewer): void {
    this.clienstSubject.complete();
  }

  public loadClients(clients: ClientInterface[]) {
    this.clienstSubject.next(clients);
  }
}