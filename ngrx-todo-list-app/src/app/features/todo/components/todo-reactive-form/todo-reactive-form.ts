import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EventBusService } from '../../../../core/services/event-bus-service';
import { Actions } from '../../../../core/enums/actions';

@Component({
  selector: 'app-todo-reactive-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-reactive-form.html',
  styleUrl: './todo-reactive-form.css',
})
export class TodoReactiveForm {

  private formBuilder = inject(FormBuilder)
  private eventBusService = inject(EventBusService)

  todoForm = this.formBuilder.group({
    title:[''],
    completed:[false],
  })

  get isTitleValid(){
    const isValid = this.todoForm.get('title')?.invalid && this.todoForm.get('title')?.touched

    return isValid
  }

  submit(){
    this.eventBusService.dispatch({type:Actions.NEW_TODO,payload:this.todoForm.value})
  }
}
