import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoFilter } from '../../../models/todo.interface';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.css'],
})
export class TodoFilterComponent {
  @Input() activeFilter: TodoFilter = 'all';
  @Input() totalCount = 0;
  @Input() completedCount = 0;
  @Output() filterChange = new EventEmitter<TodoFilter>();
  @Output() clearCompleted = new EventEmitter<void>();

  filters = [
    { value: 'all' as TodoFilter, label: 'All' },
    { value: 'active' as TodoFilter, label: 'Active' },
    { value: 'completed' as TodoFilter, label: 'Completed' },
  ];

  onFilterChange(filter: TodoFilter): void {
    this.filterChange.emit(filter);
  }

  getActivePercentage(): number {
    if (this.totalCount === 0) return 0;
    const activeCount = this.totalCount - this.completedCount;
    return (activeCount / this.totalCount) * 100;
  }

  getCompletedPercentage(): number {
    if (this.totalCount === 0) return 0;
    return (this.completedCount / this.totalCount) * 100;
  }
}
