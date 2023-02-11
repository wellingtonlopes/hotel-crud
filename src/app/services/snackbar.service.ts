import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertSnackbarComponent } from '../components/shared-components/alert-snackbar/alert-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) { }

  public showSnackbarError(messageKey: string) {
    this.snackbar.openFromComponent(AlertSnackbarComponent, {
      verticalPosition: 'top',
      panelClass: 'snackbar-error',
      data: { messageKey: messageKey, isError: true }
    });
  }

  public showSnackbarSuccess(messageKey: string) {
    this.snackbar.openFromComponent(AlertSnackbarComponent, {
      verticalPosition: 'top',
      panelClass: 'snackbar-success',
      duration: 5000,
      data: { messageKey: messageKey }
    });
  }
}
