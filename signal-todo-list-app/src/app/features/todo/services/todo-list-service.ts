import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Todo, Todos } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {

  private httpClient:HttpClient = inject(HttpClient)
  private readonly todoSignal: WritableSignal<Todos>= signal<Todos>([])
  readonly todos = this.todoSignal.asReadonly()



  loadAll(){
    // this.httpClient.get<Todos>(environment.urlTodos).subscribe((todos:Todos) => this.todoSignal.set(todos))
    this.httpClient.get<Todos>(environment.urlTodos).subscribe(this.todoSignal.set)

  }

  delete(todo:Todo){
    const url = `${environment.urlTodos}/${todo.id}`
    //freshness : after deletion, we reload all the todos
    // this.httpClient.delete<void>(url).subscribe(() => {
    //   this.loadAll()
    // })


    //optimistic : we delete the todo from the list before the deletion is effective on the server,
    // if the deletion fails, we will have to reload all the todos to get the correct list

    const currentTodos = this.todoSignal()
    const newTodos = currentTodos.filter(t => t.id !== todo.id)
    this.todoSignal.set(newTodos)


    this.httpClient.delete<void>(url).subscribe({
      error: () => {
        this.loadAll()
      }
    })

  }


  save(todo:Todo){
    this.httpClient.post<Todo>(environment.urlTodos, todo).subscribe(() => {
      this.loadAll()
    })
  }


}
