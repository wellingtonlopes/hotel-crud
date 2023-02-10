import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class CustomPaginatorComponent {
  @Input()
  currentTotalCount: number = 0;

  @Input()
  pageSize: number = 0;

  @Output()
  onChangePage: EventEmitter<number> = new EventEmitter();

  public changePage(event: PageEvent): void {
    this.onChangePage.emit(event.pageIndex);
  }
}
