import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InnerHeaderComponent } from './inner-header/inner-header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InnerHeaderComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    InnerHeaderComponent,
    CommonModule,
    FormsModule,
  ]
})
export class SharedComponentsModule { }
