import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as TodoActions from './todo.actions';
import { Todo } from '../../models/todo.interface';
import { environment } from '../../environments/environment';

@Injectable()
export class TodoEffects {
  private apiUrl = environment.apiUrl;
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() =>
        this.http.get<Todo[]>(this.apiUrl).pipe(
          map((todos) => TodoActions.loadTodosSuccess({ todos })),
          catchError((error) => of(TodoActions.loadTodosFailure({ error })))
        )
      )
    )
  );

  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.createTodo),
      mergeMap(({ request }) => {
        if (!request.title || !request.title.trim()) {
          return of();
        }

        return this.http.post<Todo>(this.apiUrl, request).pipe(
          map((todo) => TodoActions.createTodoSuccess({ todo })),
          catchError((error) => of(TodoActions.createTodoFailure({ error })))
        );
      })
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodo),
      mergeMap(({ request }) =>
        this.http.put<Todo>(`${this.apiUrl}/${request.id}`, request).pipe(
          map((todo) => TodoActions.updateTodoSuccess({ todo })),
          catchError((error) => of(TodoActions.updateTodoFailure({ error })))
        )
      )
    )
  );

  toggleTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.toggleTodo),
      mergeMap(({ id }) =>
        this.http.patch<Todo>(`${this.apiUrl}/${id}/toggle`, {}).pipe(
          map((todo) => TodoActions.toggleTodoSuccess({ todo })),
          catchError((error) => of(TodoActions.toggleTodoFailure({ error })))
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      mergeMap(({ id }) =>
        this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
          map(() => TodoActions.deleteTodoSuccess({ id })),
          catchError((error) => of(TodoActions.deleteTodoFailure({ error })))
        )
      )
    )
  );

  clearCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.clearCompleted),
      mergeMap(() =>
        this.http.delete<void>(`${this.apiUrl}/completed`).pipe(
          map(() => TodoActions.clearCompletedSuccess()),
          catchError((error) =>
            of(TodoActions.clearCompletedFailure({ error }))
          )
        )
      )
    )
  );
}
