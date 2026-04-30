import { TestBed } from '@angular/core/testing';

import { TodoEffect } from './todo-effect';

describe('TodoEffect', () => {
  let service: TodoEffect;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoEffect);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
