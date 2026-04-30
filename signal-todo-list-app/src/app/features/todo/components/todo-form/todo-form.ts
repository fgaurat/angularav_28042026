import { Component, inject, signal } from '@angular/core';
import { Todo } from '../../models/todo';
import { form, FormField, required } from '@angular/forms/signals';
import { TodoListService } from '../../services/todo-list-service';

@Component({
  selector: 'app-todo-form',
  imports: [FormField],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  todoService = inject(TodoListService);
  readonly todoModel = signal<Todo>({
    title: '',
    completed: false,
  });

  readonly todoForm = form(this.todoModel, (schemaPath) => {
    required(schemaPath.title);
  });

  submit(event: Event) {
    event.preventDefault();
    this.todoService.save(this.todoModel());
  }
}
