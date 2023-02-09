import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { first } from 'rxjs';

import { RoomReport } from 'src/app/interfaces/room-report.interface';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData!: ChartConfiguration<'bar'>['data'];
  public barChartOptions!: ChartConfiguration<'bar'>['options'];

  private roomDataSets!: RoomReport[];

  constructor(private readonly reportsService: ReportsService) { }

  ngOnInit(): void {
    this.reportsService.getRoomReports().pipe(first()).subscribe(response => {
      this.roomDataSets = response.roomReports;
      this.setBarChartData(this.roomDataSets);
      this.setBarChartOptions();
    });
  }

  private setBarChartData(chartData: RoomReport[]): void {
    this.barChartData = {
      labels: ['last 12 months', 'last 6 months', 'last 3 months'],
      datasets: [
        { data: chartData[0].data, label: chartData[0].dataSet },
        { data: chartData[1].data, label: chartData[1].dataSet },
        { data: chartData[2].data, label: chartData[2].dataSet },
        { data: chartData[3].data, label: chartData[3].dataSet }
      ]
    };
  }

  private setBarChartOptions(): void {
    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };
  }
}
