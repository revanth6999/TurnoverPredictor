/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompensationService } from './compensation.service';

describe('Service: Compensation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompensationService]
    });
  });

  it('should ...', inject([CompensationService], (service: CompensationService) => {
    expect(service).toBeTruthy();
  }));
});
