import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetasInicioComponent } from './etiquetas-inicio.component';

describe('EtiquetasInicioComponent', () => {
  let component: EtiquetasInicioComponent;
  let fixture: ComponentFixture<EtiquetasInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtiquetasInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtiquetasInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
