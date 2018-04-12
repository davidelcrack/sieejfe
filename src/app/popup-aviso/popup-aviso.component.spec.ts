import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAvisoComponent } from './popup-aviso.component';

describe('PopupAvisoComponent', () => {
  let component: PopupAvisoComponent;
  let fixture: ComponentFixture<PopupAvisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupAvisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
