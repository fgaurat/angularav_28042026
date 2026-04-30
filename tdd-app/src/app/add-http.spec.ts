import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { AddHttp } from './add-http';

describe('AddHttp', () => {
  let service: AddHttp;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://localhost:3000/sum';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(AddHttp);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('add()', () => {
    it('doit envoyer une requête POST vers https://localhost:3000/sum', () => {
      service.add(2, 3).subscribe();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');

      req.flush({ result: 5 });
    });

    it('doit envoyer val1 et val2 dans le body au format JSON', () => {
      service.add(7, 11).subscribe();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.body).toEqual({ val1: 7, val2: 11 });

      req.flush({ result: 18 });
    });

    it('doit retourner un Observable contenant le résultat de la somme', () => {
      let actualResult: number | undefined;
      service.add(4, 6).subscribe((value) => (actualResult = value));

      const req = httpMock.expectOne(apiUrl);
      req.flush({ result: 10 });

      expect(actualResult).toBe(10);
    });

    it('doit gérer correctement des nombres négatifs', () => {
      let actualResult: number | undefined;
      service.add(-3, -7).subscribe((value) => (actualResult = value));

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.body).toEqual({ val1: -3, val2: -7 });
      req.flush({ result: -10 });

      expect(actualResult).toBe(-10);
    });

    it('doit gérer correctement zéro', () => {
      let actualResult: number | undefined;
      service.add(0, 0).subscribe((value) => (actualResult = value));

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.body).toEqual({ val1: 0, val2: 0 });
      req.flush({ result: 0 });

      expect(actualResult).toBe(0);
    });

    it('ne doit pas déclencher la requête tant que personne ne souscrit', () => {
      service.add(1, 2);

      httpMock.expectNone(apiUrl);
    });

    it('doit déclencher une nouvelle requête à chaque subscribe', () => {
      const obs = service.add(1, 2);
      obs.subscribe();
      obs.subscribe();

      const requests = httpMock.match(apiUrl);
      expect(requests.length).toBe(2);
      requests.forEach((req) => req.flush({ result: 3 }));
    });

    it('doit propager les erreurs HTTP au subscriber', () => {
      let actualError: { status: number } | undefined;
      service.add(1, 2).subscribe({
        next: () => {
          throw new Error('ne devrait pas être appelé');
        },
        error: (err) => (actualError = err),
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush('Erreur serveur', {
        status: 500,
        statusText: 'Server Error',
      });

      expect(actualError).toBeTruthy();
      expect(actualError?.status).toBe(500);
    });

    it('doit envoyer le body au format JSON (Content-Type)', () => {
      service.add(1, 1).subscribe();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.body).toEqual({ val1: 1, val2: 1 });
      expect(typeof req.request.body).toBe('object');

      req.flush({ result: 2 });
    });
  });
});
