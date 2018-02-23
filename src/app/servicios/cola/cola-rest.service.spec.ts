import { TestBed, inject } from '@angular/core/testing';

import { ColaRestService } from './cola-rest.service';

describe('ColaRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColaRestService]
    });
  });

  it('should be created', inject([ColaRestService], (service: ColaRestService) => {
    expect(service).toBeTruthy();
  }));
});
