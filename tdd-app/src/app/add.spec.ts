import { TestBed } from '@angular/core/testing';

import { Add } from './add';

describe('Add', () => {
  let service: Add;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Add);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add two numbers correctly', () => {
    const result = service.add(2, 3);
    expect(result).toBe(5);
  });
});
