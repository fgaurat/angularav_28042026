import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from '../services/todo-service';
import { deleteTodo, loadTodos, loadTodosSuccess } from '../actions/todo.actions';
import { map, switchMap, tap } from 'rxjs';
import { Todos } from '../models/todo';
import { Action } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class TodoEffect {

  private actions$ = inject(Actions);
  private todoService=inject(TodoService)

  loadTodo$ = createEffect(()=>{
      return this.actions$.pipe(
        ofType(loadTodos),
        switchMap(()=>this.todoService.findAll()),
        map((todos:Todos) => loadTodosSuccess(todos))
      )
  })

  deleteTodo$ = createEffect(()=>{
      return this.actions$.pipe(
        ofType(deleteTodo),
        switchMap((action: ReturnType<typeof deleteTodo>) => this.todoService.delete(action.todo)),
        map(() => loadTodos())
      )
  })



  // deleteTodoPerf$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(deleteTodo),
  //     tap((action: ReturnType<typeof deleteTodo>) => {
  //       this.todoService.delete(action.todo).subscribe();
  //     }),
  //     map((action: ReturnType<typeof deleteTodo>) => deleteTodoSuccess(action.todo)),
  //   );
  // });


}
