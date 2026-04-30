import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Add {
  add(a: number, b: number): number {
    return a + b;
  }
}
