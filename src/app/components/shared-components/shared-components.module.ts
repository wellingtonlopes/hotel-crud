import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

import { InnerHeaderComponent } from './inner-header/inner-header.component';
import { CustomPaginatorComponent } from './custom-paginator/paginator.component';



@NgModule({
  declarations: [
    InnerHeaderComponent,
    CustomPaginatorComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  exports: [
    InnerHeaderComponent,
    CustomPaginatorComponent,
    CommonModule,
    FormsModule,
  ]
})
export class SharedComponentsModule { }
