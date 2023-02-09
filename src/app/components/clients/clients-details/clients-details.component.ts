import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { ClientInterface } from 'src/app/interfaces/client.interface';
import { ClientsService } from 'src/app/services/clients.service';
import { Constants } from 'src/app/shared/contants';

@Component({
  selector: 'app-clients-details',
  templateUrl: './clients-details.component.html',
  styleUrls: ['./clients-details.component.scss']
})
export class ClientsDetailsComponent implements OnInit {
  public client!: ClientInterface;

  private idParameter: number | null;

  constructor(private clientsService: ClientsService, private activatedRoute: ActivatedRoute) {
    this.idParameter = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.idParameter) {
      this.clientsService.getClientById(this.idParameter).pipe(first()).subscribe(response => {
        this.client = response;
      })
    }
  }

}
