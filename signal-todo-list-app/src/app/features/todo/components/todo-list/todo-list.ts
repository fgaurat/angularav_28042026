import { Component, inject } from '@angular/core';
import { TodoListService } from '../../services/todo-list-service';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {

  todoListService = inject(TodoListService)
  readonly todos = this.todoListService.todos

  constructor(){
    this.todoListService.loadAll()
  }

  deleteTodo(todo:Todo){
    this.todoListService.delete(todo)
  }

}
