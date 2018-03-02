import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionamientoExternoComponent } from './relacionamiento-externo.component';

describe('RelacionamientoExternoComponent', () => {
  let component: RelacionamientoExternoComponent;
  let fixture: ComponentFixture<RelacionamientoExternoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelacionamientoExternoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelacionamientoExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
