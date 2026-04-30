import { Component, input, Input, Signal } from '@angular/core';

@Component({
  selector: 'app-page-03',
  imports: [],
  templateUrl: './page-03.html',
  styleUrl: './page-03.css',
})
export class Page03 {
  // @Input() name: string | null = null;

  name:Signal<string> = input<string>("name");




}
