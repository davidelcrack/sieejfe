import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitadoCrearComponent } from './invitado-crear.component';

describe('InvitadoCrearComponent', () => {
  let component: InvitadoCrearComponent;
  let fixture: ComponentFixture<InvitadoCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitadoCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitadoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
