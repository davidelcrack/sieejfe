import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DominioPopUpComponent } from './dominio-pop-up.component';

describe('DominioPopUpComponent', () => {
  let component: DominioPopUpComponent;
  let fixture: ComponentFixture<DominioPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DominioPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DominioPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
