import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SharedComponentsModule } from './components/shared-components/shared-components.module';
import { Constants } from './shared/contants';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    SharedComponentsModule,
    MatMenuModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: Constants.DATE_FORMATS.DDMMYYY }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
