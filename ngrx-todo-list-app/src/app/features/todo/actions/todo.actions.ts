import { createAction } from '@ngrx/store';
import { Actions } from '../../../core/enums/actions';
import { Todo, Todos } from '../models/todo';


export const loadTodos = createAction(Actions.LOAD_TODOS);
export const loadTodosSuccess = createAction(Actions.LOAD_TODOS_SUCCESS,(todos:Todos)=>({todos}));
export const deleteTodo = createAction(Actions.DELETE_TODO,(todo:Todo)=>({todo}));
