import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { TodoService } from '../services/todo.service';
import { Todo, CreateTodoRequest, TodoFilter } from '../models/todo.interface';
import * as TodoSelectors from './store/todo.selectors';
import * as TodoActions from './store/todo.actions';
import { TodoState } from './store/todo.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  angularVersion = '18';

  allTodos$: Observable<Todo[]>;
  filteredTodos$: Observable<Todo[]>;
  completedTodos$: Observable<Todo[]>;
  currentFilter: TodoFilter = 'all';

  constructor(
    private todoService: TodoService,
    private store: Store<{ todos: TodoState }>
  ) {
    this.allTodos$ = this.store.select(TodoSelectors.selectAllTodos);
    this.completedTodos$ = this.store.select(
      TodoSelectors.selectCompletedTodos
    );
    this.filteredTodos$ = this.getFilteredTodos();
  }

  ngOnInit(): void {
    // Dispatch the load action from the app component
    this.store.dispatch(TodoActions.loadTodos());

    this.allTodos$.subscribe((todos) => {
      const hasValid = todos.some((t) => t.title && t.title.trim());

      if (!hasValid) {
      }
    });
  }

  onCreateTodo(request: CreateTodoRequest): void {
    if (!request.title || !request.title.trim()) {
      return;
    }
    this.todoService.createTodo(request).subscribe();
  }

  onToggleTodo(id: number): void {
    this.todoService.toggleTodo(id).subscribe();
  }

  onDeleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe();
  }

  onUpdateTodo(update: {
    id: number;
    title: string;
    description?: string;
    category: any;
    priority: any;
    dueDate?: Date;
  }): void {
    if (!update.title || !update.title.trim()) {
      return;
    }
    this.todoService.updateTodo(update).subscribe();
  }

  onFilterChange(filter: TodoFilter): void {
    this.currentFilter = filter;
    this.filteredTodos$ = this.getFilteredTodos();
  }

  onClearCompleted(): void {
    this.todoService.clearCompleted().subscribe();
  }

  trackByTodoId(index: number, todo: Todo): number {
    return todo.id;
  }

  getEmptyStateTitle(): string {
    switch (this.currentFilter) {
      case 'active':
        return 'No active todos';
      case 'completed':
        return 'No completed todos';
      default:
        return 'No todos yet';
    }
  }

  getEmptyStateDescription(): string {
    switch (this.currentFilter) {
      case 'active':
        return 'All your todos are completed! Great job!';
      case 'completed':
        return 'Complete some todos to see them here.';
      default:
        return 'Add your first todo above to get started.';
    }
  }

  private getFilteredTodos(): Observable<Todo[]> {
    switch (this.currentFilter) {
      case 'active':
        return this.store.select(TodoSelectors.selectActiveTodos);
      case 'completed':
        return this.store.select(TodoSelectors.selectCompletedTodos);
      default:
        return this.store.select(TodoSelectors.selectAllTodos);
    }
  }
}
