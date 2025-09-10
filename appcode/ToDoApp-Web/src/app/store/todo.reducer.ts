import { createReducer, on } from '@ngrx/store';
import { initialState } from './todo.state';
import * as TodoActions from './todo.actions';

export const todoReducer = createReducer(
  initialState,

  // Load Todos
  on(TodoActions.loadTodos, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false,
    error: null,
  })),
  on(TodoActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Todo
  on(TodoActions.createTodo, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TodoActions.createTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
    loading: false,
    error: null,
  })),
  on(TodoActions.createTodoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Todo
  on(TodoActions.updateTodo, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TodoActions.updateTodoSuccess, (state, { todo }) => {
    const index = state.todos.findIndex((t) => t.id === todo.id);
    const updatedTodos = [...state.todos];
    if (index !== -1) {
      updatedTodos[index] = todo;
    }
    return {
      ...state,
      todos: updatedTodos,
      loading: false,
      error: null,
    };
  }),
  on(TodoActions.updateTodoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Toggle Todo
  on(TodoActions.toggleTodo, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TodoActions.toggleTodoSuccess, (state, { todo }) => {
    const index = state.todos.findIndex((t) => t.id === todo.id);
    const updatedTodos = [...state.todos];
    if (index !== -1) {
      updatedTodos[index] = todo;
    }
    return {
      ...state,
      todos: updatedTodos,
      loading: false,
      error: null,
    };
  }),
  on(TodoActions.toggleTodoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Todo
  on(TodoActions.deleteTodo, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TodoActions.deleteTodoSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
    loading: false,
    error: null,
  })),
  on(TodoActions.deleteTodoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Clear Completed
  on(TodoActions.clearCompleted, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TodoActions.clearCompletedSuccess, (state) => ({
    ...state,
    todos: state.todos.filter((todo) => !todo.completed),
    loading: false,
    error: null,
  })),
  on(TodoActions.clearCompletedFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
