import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionCorreosComponent } from './administracion-correos.component';

describe('AdministracionCorreosComponent', () => {
  let component: AdministracionCorreosComponent;
  let fixture: ComponentFixture<AdministracionCorreosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministracionCorreosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionCorreosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
