/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UtTestService } from './ut-test.service';

describe('Service: UtTest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtTestService]
    });
  });

  it('should ...', inject([UtTestService], (service: UtTestService) => {
    expect(service).toBeTruthy();
  }));
});
