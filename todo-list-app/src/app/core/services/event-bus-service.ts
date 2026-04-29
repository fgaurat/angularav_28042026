import { Injectable } from '@angular/core';
import { Action } from '../models/action';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventBusService {

  private bus:Subject<Action> = new Subject<Action>()
  bus$:Observable<Action> = this.bus.asObservable()


  dispatch(action:Action){
    console.log("Action",action);

    this.bus.next(action)
  }


}
