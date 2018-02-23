import { TestBed, inject } from '@angular/core/testing';

import { ColaService } from './cola.service';

describe('ColaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColaService]
    });
  });

  it('should be created', inject([ColaService], (service: ColaService) => {
    expect(service).toBeTruthy();
  }));
});
