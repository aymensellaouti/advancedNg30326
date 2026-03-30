import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { cvsResolverResolver } from './cvs-resolver.resolver';

describe('cvsResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => cvsResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
