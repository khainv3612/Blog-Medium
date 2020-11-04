import { TestBed } from '@angular/core/testing';

import { AuthServiceSecu } from './auth-service-secu.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthServiceSecu = TestBed.get(AuthServiceSecu);
    expect(service).toBeTruthy();
  });
});
