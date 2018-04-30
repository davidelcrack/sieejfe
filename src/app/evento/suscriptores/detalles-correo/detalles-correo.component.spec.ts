import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesCorreoComponent } from './detalles-correo.component';

describe('DetallesCorreoComponent', () => {
  let component: DetallesCorreoComponent;
  let fixture: ComponentFixture<DetallesCorreoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesCorreoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesCorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
