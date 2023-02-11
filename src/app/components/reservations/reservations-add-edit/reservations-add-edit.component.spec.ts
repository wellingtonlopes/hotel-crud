import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsAddEditComponent } from './reservations-add-edit.component';

describe('ReservationsAddEditComponent', () => {
  let component: ReservationsAddEditComponent;
  let fixture: ComponentFixture<ReservationsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationsAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
