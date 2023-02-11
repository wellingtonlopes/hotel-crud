import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { InnerHeaderComponent } from './inner-header/inner-header.component';
import { CustomPaginatorComponent } from './custom-paginator/paginator.component';
import { AlertSnackbarComponent } from './alert-snackbar/alert-snackbar.component';



@NgModule({
  declarations: [
    InnerHeaderComponent,
    CustomPaginatorComponent,
    AlertSnackbarComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSnackBarModule,
  ],
  exports: [
    InnerHeaderComponent,
    CustomPaginatorComponent,
    AlertSnackbarComponent,
    CommonModule,
    FormsModule,
  ]
})
export class SharedComponentsModule { }
