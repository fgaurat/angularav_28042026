import { Component } from '@angular/core';
import { TodoList } from '../../features/todo/components/todo-list/todo-list';

@Component({
  selector: 'app-todo-list-page',
  imports: [TodoList],
  templateUrl: './todo-list-page.html',
  styleUrl: './todo-list-page.css',
})
export class TodoListPage {}
