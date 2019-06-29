import { TestBed } from '@angular/core/testing';

import { GeneralService } from './general.service';

describe('ProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralService = TestBed.get(GeneralService);
    expect(service).toBeTruthy();
  });
});
