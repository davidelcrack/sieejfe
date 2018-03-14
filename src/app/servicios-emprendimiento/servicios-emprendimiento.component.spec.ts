import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosEmprendimientoComponent } from './servicios-emprendimiento.component';

describe('ServiciosEmprendimientoComponent', () => {
  let component: ServiciosEmprendimientoComponent;
  let fixture: ComponentFixture<ServiciosEmprendimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosEmprendimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosEmprendimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
