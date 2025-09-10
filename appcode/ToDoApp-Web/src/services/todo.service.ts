import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
} from '../models/todo.interface';
import * as TodoActions from '../app/store/todo.actions';
import * as TodoSelectors from '../app/store/todo.selectors';
import { TodoState } from '../app/store/todo.state';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos$: Observable<Todo[]>;

  constructor(private store: Store<{ todos: TodoState }>) {
    this.todos$ = this.store.select(TodoSelectors.selectAllTodos);
  }

  getTodos(): Observable<Todo[]> {
    return this.todos$;
  }

  createTodo(request: CreateTodoRequest): Observable<Todo> {
    if (!request.title || !request.title.trim()) {
      return new Observable<Todo>((subscriber) => subscriber.complete());
    }

    this.store.dispatch(TodoActions.createTodo({ request }));

    return new Observable<Todo>((subscriber) => subscriber.complete());
  }

  updateTodo(request: UpdateTodoRequest): Observable<Todo> {
    this.store.dispatch(TodoActions.updateTodo({ request }));

    return new Observable<Todo>((subscriber) => subscriber.complete());
  }

  toggleTodo(id: number): Observable<Todo> {
    this.store.dispatch(TodoActions.toggleTodo({ id }));

    return new Observable<Todo>((subscriber) => subscriber.complete());
  }

  deleteTodo(id: number): Observable<void> {
    this.store.dispatch(TodoActions.deleteTodo({ id }));

    return new Observable<void>((subscriber) => subscriber.complete());
  }

  clearCompleted(): Observable<void> {
    this.store.dispatch(TodoActions.clearCompleted());

    return new Observable<void>((subscriber) => subscriber.complete());
  }
}
