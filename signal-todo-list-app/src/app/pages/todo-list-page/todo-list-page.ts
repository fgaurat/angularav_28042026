import { Component } from '@angular/core';
import { TodoList } from "../../features/todo/components/todo-list/todo-list";
import { TodoForm } from "../../features/todo/components/todo-form/todo-form";

@Component({
  selector: 'app-todo-list-page',
  imports: [TodoList, TodoForm],
  templateUrl: './todo-list-page.html',
  styleUrl: './todo-list-page.css',
})
export class TodoListPage {}
