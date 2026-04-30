import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { decrement, increment, incrementBy, reset } from '../counter.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  store = inject(Store)
  count$: Observable<{value:number,name:string}> = this.store.select(state => state.count)



  increment() {
    this.store.dispatch(increment())
  }
  incrementBy2() {
    this.store.dispatch(incrementBy(2))
  }


  decrement() {
    this.store.dispatch(decrement())
  }

  reset() {
    this.store.dispatch(reset())
  }

}
