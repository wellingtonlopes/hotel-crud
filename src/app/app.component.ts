import { Component } from '@angular/core';
import { DateFormatService } from './services/date-format.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hotel-crud';
  public yearFirstFormat = DateFormatService.yearFirstDateFormat;
  public dayFirstFormat = DateFormatService.dayFirstDateFormat;

  constructor(private dateFormatService: DateFormatService) {
  }

  public emitFormat(format: string) {
    this.dateFormatService.emitDataFormat(format);
  }
}
