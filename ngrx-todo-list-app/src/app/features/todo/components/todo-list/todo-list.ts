import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Todo, Todos } from '../../models/todo';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo-service';
import { EMPTY, filter, merge, Observable, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { EventBusService } from '../../../../core/services/event-bus-service';
import { Actions } from '../../../../core/enums/actions';
import { Action } from '../../../../core/models/action';
import { Store } from '@ngrx/store';
import { deleteTodo, loadTodos } from '../../actions/todo.actions';

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule,AsyncPipe],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList implements OnInit {

  private store = inject(Store)

  todos$:Observable<Todos> =this.store.select(state=>state.todoList)

  ngOnInit() {
    this.store.dispatch(loadTodos())
  }

  deleteTodo(todo:Todo){
        this.store.dispatch(deleteTodo(todo))

  }

}
