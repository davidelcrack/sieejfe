import { TestBed, inject } from '@angular/core/testing';

import { EmprendimientoServicesService } from './emprendimiento-services.service';

describe('EmprendimientoServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmprendimientoServicesService]
    });
  });

  it('should be created', inject([EmprendimientoServicesService], (service: EmprendimientoServicesService) => {
    expect(service).toBeTruthy();
  }));
});
