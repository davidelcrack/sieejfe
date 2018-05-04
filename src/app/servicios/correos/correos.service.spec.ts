import { TestBed, inject } from '@angular/core/testing';

import { CorreosService } from './correos.service';

describe('CorreosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CorreosService]
    });
  });

  it('should be created', inject([CorreosService], (service: CorreosService) => {
    expect(service).toBeTruthy();
  }));
});
