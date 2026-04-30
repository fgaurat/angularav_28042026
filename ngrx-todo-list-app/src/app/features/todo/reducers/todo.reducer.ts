import { createReducer, on } from '@ngrx/store';
import { Todos } from '../models/todo';
import { loadTodosSuccess } from '../actions/todo.actions';

export const initialState:Todos = [];

export const todoReducer = createReducer(
  initialState,
  on(loadTodosSuccess,(_,action)=>action.todos)
  //on(deleteTodoSuccess,(state,action) => state.filter(todo=> todo.id !== action.todo.id))

)
