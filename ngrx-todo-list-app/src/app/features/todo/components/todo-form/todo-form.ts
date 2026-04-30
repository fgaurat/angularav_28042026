import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo';
import { JsonPipe } from '@angular/common';
import { TodoService } from '../../services/todo-service';
import { EventBusService } from '../../../../core/services/event-bus-service';
import { Actions } from '../../../../core/enums/actions';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule, JsonPipe],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  todoService: TodoService = inject(TodoService);
  eventBus: EventBusService = inject(EventBusService);

  todoFormModel: Todo = {
    title: '',
    completed: false,
  };

  submit() {
    console.log(this.todoFormModel);
    this.eventBus.dispatch({type:Actions.NEW_TODO,payload:this.todoFormModel})
    // this.todoService.save(this.todoFormModel).subscribe(
    //   () => this.eventBus.dispatch({type:Actions.NEW_TODO})
    // );
  }
}
