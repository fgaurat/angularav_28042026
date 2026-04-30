import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Todo, Todos } from '../../models/todo';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo-service';
import { EMPTY, filter, merge, Observable, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { EventBusService } from '../../../../core/services/event-bus-service';
import { Actions } from '../../../../core/enums/actions';
import { Action } from '../../../../core/models/action';

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule,AsyncPipe],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList implements OnInit {

  // readonly todos$:Observable<Todos> = of([]);
  todos$:Observable<Todos> = EMPTY;
  todoService = inject(TodoService);
  evenBusService = inject(EventBusService);
  changeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit() {
    // this.todos$ = this.todoService.findAll()

    // this.evenBusService.bus$.subscribe(()=>{
    //   this.todos$ = this.todoService.findAll()
    //   this.changeDetectorRef.detectChanges();
    // })

    const new$ = this.evenBusService.bus$.pipe(
      filter((action:Action)=> action.type===Actions.NEW_TODO),
      switchMap((action:Action)=> this.todoService.save(action.payload))
    )
    const delete$ = this.evenBusService.bus$.pipe(
      filter((action:Action)=> action.type===Actions.DELETE_TODO),
      switchMap((action:Action)=> this.todoService.delete(action.payload))
    )

    const load$ = this.evenBusService.bus$.pipe(
      filter((action:Action)=> action.type===Actions.LOAD_TODOS),
    )

    this.todos$ = merge(new$,delete$,load$).pipe(
      switchMap(()=> this.todoService.findAll())
    )

  }

  ngAfterViewInit(){
    this.evenBusService.dispatch({type:Actions.LOAD_TODOS})
  }

  deleteTodo(todo:Todo){
    this.evenBusService.dispatch({type:Actions.DELETE_TODO,payload:todo})

    // this.todoService.delete(todo).subscribe(()=>{
    //   this.ngOnInit();
    //   this.changeDetectorRef.detectChanges();
    // });
  }

  ngOnDestroy() {
    // this.todos$.unsubscribe();
  }

}
