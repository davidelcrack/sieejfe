import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisIdeasComponent } from './mis-ideas.component';

describe('MisIdeasComponent', () => {
  let component: MisIdeasComponent;
  let fixture: ComponentFixture<MisIdeasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisIdeasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
