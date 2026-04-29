import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Todo, Todos } from '../../models/todo';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo-service';
import { EMPTY, filter, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule,AsyncPipe],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList implements OnInit {

  // readonly todos$:Observable<Todos> = of([]);
  todos$:Observable<Todos> = EMPTY;
  todoService = inject(TodoService);
  changeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit() {
    this.todos$ = this.todoService.findAll()
  }

  deleteTodo(todo:Todo){
    this.todoService.delete(todo).subscribe(()=>{
      this.ngOnInit();
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy() {
    // this.todos$.unsubscribe();
  }

}
