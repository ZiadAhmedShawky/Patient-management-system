import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRegisterationComponent } from './patient-registeration.component';

describe('PatientRegisterationComponent', () => {
  let component: PatientRegisterationComponent;
  let fixture: ComponentFixture<PatientRegisterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientRegisterationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientRegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
