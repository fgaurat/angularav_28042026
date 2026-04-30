import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-04',
  imports: [],
  templateUrl: './page-04.html',
  styleUrl: './page-04.css',
})
export class Page04 {
  // @Input("todos")
  // todoList:any[] = [];
  @Input()
  todos:any[] = [];



  // constructor(activatedRoute:ActivatedRoute){
  //   this.todoList = activatedRoute.snapshot.data["todos"];
  // }
}
