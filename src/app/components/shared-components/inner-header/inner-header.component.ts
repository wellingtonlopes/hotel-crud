import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inner-header',
  templateUrl: './inner-header.component.html',
  styleUrls: ['./inner-header.component.scss']
})
export class InnerHeaderComponent {
  @Input()
  public title = '';

  @Input()
  public subTitle = '';

  @Input()
  public hasActionButton = false;

  public hasSubtitle(): boolean {
    return this.subTitle !== '';
  }

  public hasAddButton(): boolean {
    return this.hasActionButton;
  }
}
