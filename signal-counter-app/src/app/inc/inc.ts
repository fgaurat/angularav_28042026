import { Component, inject } from '@angular/core';
import { CountSignal } from '../count-signal';

@Component({
  selector: 'app-inc',
  imports: [],
  templateUrl: './inc.html',
  styleUrl: './inc.css',
})
export class Inc {

    countSignalService = inject(CountSignal)

    doInc(){
      this.countSignalService.inc()
    }



}
