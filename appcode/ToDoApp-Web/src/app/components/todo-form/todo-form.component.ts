import { Component, Output, EventEmitter } from '@angular/core';
import {
  CreateTodoRequest,
  TodoCategory,
  TodoPriority,
  CategoryOption,
  PriorityOption,
} from '../../../models/todo.interface';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent {
  @Output() createTodo = new EventEmitter<CreateTodoRequest>();
  title = '';
  description = '';
  category: TodoCategory = 'other';
  priority: TodoPriority = 'medium';
  dueDateString = '';
  minDate = '';

  categories: CategoryOption[] = [
    { value: 'work', label: 'Work', icon: '💼', color: '#3b82f6' },
    { value: 'personal', label: 'Personal', icon: '🏠', color: '#8b5cf6' },
    { value: 'shopping', label: 'Shopping', icon: '🛒', color: '#10b981' },
    { value: 'health', label: 'Health', icon: '💪', color: '#f59e0b' },
    { value: 'education', label: 'Education', icon: '📚', color: '#ef4444' },
    { value: 'other', label: 'Other', icon: '📌', color: '#6b7280' },
  ];

  priorities: PriorityOption[] = [
    { value: 'low', label: 'Low', icon: '🟢', color: '#65a30d' },
    { value: 'medium', label: 'Medium', icon: '🟡', color: '#d97706' },
    { value: 'high', label: 'High', icon: '🟠', color: '#ea580c' },
    { value: 'urgent', label: 'Urgent', icon: '🔴', color: '#dc2626' },
  ];

  constructor() {
    this.minDate = new Date().toISOString().slice(0, 16);
  }

  onSubmit(): void {
    if (this.title.trim()) {
      const dueDate = this.dueDateString
        ? new Date(this.dueDateString)
        : undefined;
      this.createTodo.emit({
        title: this.title.trim(),
        description: this.description.trim() || undefined,
        category: this.category,
        priority: this.priority,
        dueDate: dueDate,
      });
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.title = '';
    this.description = '';
    this.category = 'other';
    this.priority = 'medium';
    this.dueDateString = '';
  }
}
