import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddHttp {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://localhost:3000/sum';

  add(val1: number, val2: number): Observable<number> {
    return this.http
      .post<{ result: number }>(this.url, { val1, val2 })
      .pipe(map((response) => response.result));
  }
}
