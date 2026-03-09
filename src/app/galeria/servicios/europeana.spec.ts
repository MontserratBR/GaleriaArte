import { TestBed } from '@angular/core/testing';

import { Europeana } from './europeana';

describe('Europeana', () => {
  let service: Europeana;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Europeana);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
