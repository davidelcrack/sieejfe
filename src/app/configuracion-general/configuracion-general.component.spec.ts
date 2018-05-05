import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionGeneralComponent } from './configuracion-general.component';

describe('ConfiguracionGeneralComponent', () => {
  let component: ConfiguracionGeneralComponent;
  let fixture: ComponentFixture<ConfiguracionGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
