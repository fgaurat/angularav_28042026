import { Component } from '@angular/core';
import { TodoList } from '../../features/todo/components/todo-list/todo-list';
import { TodoForm } from '../../features/todo/components/todo-form/todo-form';
import { TodoReactiveForm } from "../../features/todo/components/todo-reactive-form/todo-reactive-form";

@Component({
  selector: 'app-todo-list-page',
  imports: [TodoList, TodoForm, TodoReactiveForm],
  templateUrl: './todo-list-page.html',
  styleUrl: './todo-list-page.css',
})
export class TodoListPage {}
