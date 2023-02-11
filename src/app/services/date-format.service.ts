import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constants } from '../shared/contants';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {
  static readonly yearFirstDateFormat = 'YYYY/MM/DD';
  static readonly dayFirstDateFormat = 'DD/MM/YYYY';

  private dateFormatSubject: BehaviorSubject<string> = new BehaviorSubject<string>(DateFormatService.dayFirstDateFormat);

  constructor() { }

  public listenToDateFormat(): Observable<string> {
    return this.dateFormatSubject;
  }

  public emitDataFormat(event: string): void {
    this.dateFormatSubject.next(event);
  }
}
