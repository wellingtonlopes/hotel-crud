import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert-snackbar',
  templateUrl: './alert-snackbar.component.html',
  styleUrls: ['./alert-snackbar.component.scss']
})
export class AlertSnackbarComponent {
  public messageKey = '';
  public isError = false;

  constructor(private snackbarRef: MatSnackBarRef<AlertSnackbarComponent>, @Inject(MAT_SNACK_BAR_DATA) private data: any) {
    this.messageKey = this.data.messageKey;
    this.isError = this.data.isError;
  }

  public closeSnackbar() {
    this.snackbarRef.dismiss();
  }
}
