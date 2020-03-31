import { TestBed } from '@angular/core/testing';

import { DAMService } from './dam.service';

describe('DAMService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DAMService = TestBed.get(DAMService);
    expect(service).toBeTruthy();
  });
});
