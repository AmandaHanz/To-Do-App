import { createAction, props } from '@ngrx/store';
import {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
} from '../../models/todo.interface';

// Load Todos
export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: Todo[] }>()
);
export const loadTodosFailure = createAction(
  '[Todo] Load Todos Failure',
  props<{ error: any }>()
);

// Create Todo
export const createTodo = createAction(
  '[Todo] Create Todo',
  props<{ request: CreateTodoRequest }>()
);
export const createTodoSuccess = createAction(
  '[Todo] Create Todo Success',
  props<{ todo: Todo }>()
);
export const createTodoFailure = createAction(
  '[Todo] Create Todo Failure',
  props<{ error: any }>()
);

// Update Todo
export const updateTodo = createAction(
  '[Todo] Update Todo',
  props<{ request: UpdateTodoRequest }>()
);
export const updateTodoSuccess = createAction(
  '[Todo] Update Todo Success',
  props<{ todo: Todo }>()
);
export const updateTodoFailure = createAction(
  '[Todo] Update Todo Failure',
  props<{ error: any }>()
);

// Toggle Todo
export const toggleTodo = createAction(
  '[Todo] Toggle Todo',
  props<{ id: number }>()
);
export const toggleTodoSuccess = createAction(
  '[Todo] Toggle Todo Success',
  props<{ todo: Todo }>()
);
export const toggleTodoFailure = createAction(
  '[Todo] Toggle Todo Failure',
  props<{ error: any }>()
);

// Delete Todo
export const deleteTodo = createAction(
  '[Todo] Delete Todo',
  props<{ id: number }>()
);
export const deleteTodoSuccess = createAction(
  '[Todo] Delete Todo Success',
  props<{ id: number }>()
);
export const deleteTodoFailure = createAction(
  '[Todo] Delete Todo Failure',
  props<{ error: any }>()
);

// Clear Completed
export const clearCompleted = createAction('[Todo] Clear Completed');
export const clearCompletedSuccess = createAction(
  '[Todo] Clear Completed Success'
);
export const clearCompletedFailure = createAction(
  '[Todo] Clear Completed Failure',
  props<{ error: any }>()
);
