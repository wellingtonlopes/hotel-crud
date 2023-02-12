import { Inject, Injectable } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constants } from '../shared/contants';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {
  static readonly yearFirstDateFormat = 'YYYY/MM/DD';
  static readonly dayFirstDateFormat = 'DD/MM/YYYY';

  private dateFormatSubject: BehaviorSubject<string>;

  constructor(@Inject(MAT_DATE_FORMATS) private formatData: any) {
    const storedDateFormat = localStorage.getItem('dateFormat') ? localStorage.getItem('dateFormat')! : DateFormatService.dayFirstDateFormat;
    this.dateFormatSubject = new BehaviorSubject<string>(storedDateFormat);

    this.listenToDateFormat().subscribe(dateFormat => {
      localStorage.setItem('dateFormat', dateFormat);
      console.log(formatData);
    })
  }

  public listenToDateFormat(): Observable<string> {
    return this.dateFormatSubject;
  }

  public emitDataFormat(event: string): void {
    this.dateFormatSubject.next(event);
  }
}
