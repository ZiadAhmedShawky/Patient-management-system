import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentRegisterationComponent } from './appointment-registeration.component';

describe('AppointmentRegisterationComponent', () => {
  let component: AppointmentRegisterationComponent;
  let fixture: ComponentFixture<AppointmentRegisterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentRegisterationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentRegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
