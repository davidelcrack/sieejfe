import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApoyoDeIdeasComponent } from './apoyo-de-ideas.component';

describe('ApoyoDeIdeasComponent', () => {
  let component: ApoyoDeIdeasComponent;
  let fixture: ComponentFixture<ApoyoDeIdeasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApoyoDeIdeasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApoyoDeIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
