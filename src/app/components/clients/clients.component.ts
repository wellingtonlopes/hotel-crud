import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { first } from 'rxjs';

import { ClientInterface } from 'src/app/interfaces/client.interface';
import { ClientsService } from 'src/app/services/clients.service';
import { Constants } from 'src/app/shared/contants';
import { ClientsSource } from './clients-data-source';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'first-name', 'last-name'];
  public clientsDataSource = new ClientsSource();
  public totalCount!: number;

  private clientList!: ClientInterface[];

  constructor(private readonly clientsService: ClientsService, private router: Router) { }

  ngOnInit(): void {
    this.getPaginatedClients(Constants.FIRST_PAGE);
  }

  public changePage(event: PageEvent): void {
    this.getPaginatedClients(event.pageIndex);
  }

  public goToElementDetails(clientId: number): void {
    this.router.navigate([`${Constants.PATH.CLIENTS}/${clientId}`]);
  }

  private getPaginatedClients(pageIndex: number) {
    this.clientsService.getClients(pageIndex).pipe(first()).subscribe(response => {
      this.clientList = response.clientList;
      this.totalCount = response.totalCount;
      this.clientsDataSource.loadClients(this.clientList);
    });
  }
}
