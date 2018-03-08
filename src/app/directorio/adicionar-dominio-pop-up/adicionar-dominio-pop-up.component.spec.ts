import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarDominioPopUpComponent } from './adicionar-dominio-pop-up.component';

describe('AdicionarDominioPopUpComponent', () => {
  let component: AdicionarDominioPopUpComponent;
  let fixture: ComponentFixture<AdicionarDominioPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarDominioPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarDominioPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
