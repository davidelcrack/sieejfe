import { TestBed, inject } from '@angular/core/testing';

import { ApoyoIdeasService } from './apoyo-ideas.service';

describe('ApoyoIdeasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApoyoIdeasService]
    });
  });

  it('should be created', inject([ApoyoIdeasService], (service: ApoyoIdeasService) => {
    expect(service).toBeTruthy();
  }));
});
