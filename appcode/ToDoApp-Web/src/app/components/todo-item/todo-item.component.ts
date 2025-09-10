import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  Todo,
  CategoryOption,
  PriorityOption,
} from '../../../models/todo.interface';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  animations: [
    trigger('fadeSlide', [
      transition(':leave', [
        animate(
          '300ms ease',
          style({
            opacity: 0,
            transform: 'translateX(100%)',
          })
        ),
      ]),
    ]),
  ],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggle = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<{
    id: number;
    title: string;
    description?: string;
    category: string;
    priority: string;
    dueDate?: Date;
  }>();

  @ViewChild('titleInput') titleInput!: ElementRef<HTMLInputElement>;

  isEditing = false;
  editTitle = '';
  editDescription = '';
  editCategory = 'other';
  editPriority = 'medium';
  editDueDateString = '';
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

  onToggle(): void {
    this.toggle.emit(this.todo.id);
  }

  onDelete(): void {
    this.delete.emit(this.todo.id);
  }

  startEdit(): void {
    this.isEditing = true;
    this.editTitle = this.todo.title;
    this.editDescription = this.todo.description || '';
    this.editCategory = this.todo.category;
    this.editPriority = this.todo.priority;
    this.editDueDateString = this.todo.dueDate
      ? new Date(
          this.todo.dueDate.getTime() -
            this.todo.dueDate.getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, 16)
      : '';

    setTimeout(() => {
      this.titleInput.nativeElement.focus();
      this.titleInput.nativeElement.select();
    }, 0);
  }

  onEditComplete(): void {
    if (this.editTitle.trim()) {
      const dueDate = this.editDueDateString
        ? new Date(this.editDueDateString)
        : undefined;
      this.update.emit({
        id: this.todo.id,
        title: this.editTitle.trim(),
        description: this.editDescription.trim() || undefined,
        category: this.editCategory,
        priority: this.editPriority,
        dueDate: dueDate,
      });
    }
    this.isEditing = false;
  }

  onEditCancel(): void {
    this.isEditing = false;
    this.editTitle = '';
    this.editDescription = '';
    this.editCategory = 'other';
    this.editPriority = 'medium';
    this.editDueDateString = '';
  }

  getCategoryColor(): string {
    return (
      this.categories.find((c) => c.value === this.todo.category)?.color ||
      '#6b7280'
    );
  }

  getCategoryLabel(): string {
    return (
      this.categories.find((c) => c.value === this.todo.category)?.label ||
      'Other'
    );
  }

  getPriorityLabel(): string {
    return (
      this.priorities.find((p) => p.value === this.todo.priority)?.label ||
      'Medium'
    );
  }

  formatDueDate(): string {
    if (!this.todo.dueDate) return '';

    const now = new Date();
    const dueDate = new Date(this.todo.dueDate);
    const timeDiff = dueDate.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Format the date
    const dateString = dueDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: dueDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });

    const timeString = dueDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    return `${dateString} at ${timeString}`;
  }

  getDueDateClass(): string {
    if (!this.todo.dueDate) return '';

    const now = new Date();
    const dueDate = new Date(this.todo.dueDate);
    const timeDiff = dueDate.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 0) return 'overdue';
    if (daysDiff === 0) return 'due-today';
    if (daysDiff === 1) return 'due-tomorrow';
    if (daysDiff <= 7) return 'due-soon';
    return 'due-later';
  }
}
