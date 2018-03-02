import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionamientoInternoComponent } from './relacionamiento-interno.component';

describe('RelacionamientoInternoComponent', () => {
  let component: RelacionamientoInternoComponent;
  let fixture: ComponentFixture<RelacionamientoInternoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelacionamientoInternoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelacionamientoInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
