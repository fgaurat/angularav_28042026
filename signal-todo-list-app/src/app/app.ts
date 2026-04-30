import { Component, signal } from '@angular/core';
import { TodoListPage } from "./pages/todo-list-page/todo-list-page";

@Component({
  selector: 'app-root',
  imports: [ TodoListPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('signal-todo-list-app');
}
