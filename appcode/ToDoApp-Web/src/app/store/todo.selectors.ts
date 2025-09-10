import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.state';

export const selectTodoState = createFeatureSelector<TodoState>('todos');

export const selectAllTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos
);

export const selectTodosLoading = createSelector(
  selectTodoState,
  (state: TodoState) => state.loading
);

export const selectTodosError = createSelector(
  selectTodoState,
  (state: TodoState) => state.error
);

export const selectActiveTodos = createSelector(selectAllTodos, (todos) =>
  todos.filter((todo) => !todo.completed)
);

export const selectCompletedTodos = createSelector(selectAllTodos, (todos) =>
  todos.filter((todo) => todo.completed)
);
