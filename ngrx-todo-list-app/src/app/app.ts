import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListPage } from "./pages/todo-list-page/todo-list-page";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoListPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ngrx-todo-list-app');
}
