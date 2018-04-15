import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSolicitudesSeviciosComponent } from './ver-solicitudes-sevicios.component';

describe('VerSolicitudesSeviciosComponent', () => {
  let component: VerSolicitudesSeviciosComponent;
  let fixture: ComponentFixture<VerSolicitudesSeviciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerSolicitudesSeviciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerSolicitudesSeviciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
