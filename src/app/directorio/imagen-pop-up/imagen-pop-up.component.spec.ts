import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenPopUpComponent } from './imagen-pop-up.component';

describe('ImagenPopUpComponent', () => {
  let component: ImagenPopUpComponent;
  let fixture: ComponentFixture<ImagenPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
