import { Component, computed, effect, Signal, signal, WritableSignal } from '@angular/core';
import { Inc } from "./inc/inc";
import { Show } from "./show/show";

@Component({
  selector: 'app-root',
  imports: [Inc, Show],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title:WritableSignal<string> = signal('signal-counter-app');

  readonly count:WritableSignal<number> = signal(0);

  readonly doubleCount: Signal<number> = computed(() => this.count() * 2);


  readonly val1:WritableSignal<number> = signal(0);
  readonly val2:WritableSignal<number> = signal(0);

  readonly val1val2: Signal<number> = computed(() => this.val1() * this.val2());

  constructor(){
    effect(()=>{
      console.log("count:",this.count())
    })
  }

  setTo12() {
    this.count.set(12);
  }

  inc() {
    this.count.update(v => v+1)
    this.add(2,3) // (2,3)=>5
    this.add(2,3) // =>5
  }

  inc_val1(){
        this.val1.update(v => v+1)

  }
  inc_val2(){
        this.val2.update(v => v+1)

  }


  add(a:number,b:number){
    return a+b
  }
}




