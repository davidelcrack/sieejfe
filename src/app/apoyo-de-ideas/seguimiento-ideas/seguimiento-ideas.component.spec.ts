import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoIdeasComponent } from './seguimiento-ideas.component';

describe('SeguimientoIdeasComponent', () => {
  let component: SeguimientoIdeasComponent;
  let fixture: ComponentFixture<SeguimientoIdeasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguimientoIdeasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
