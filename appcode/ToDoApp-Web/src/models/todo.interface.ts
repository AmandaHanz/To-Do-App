export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  category: TodoCategory;
  priority: TodoPriority;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
  dueDate?: Date;
  category?: TodoCategory;
  priority?: TodoPriority;
}

export interface UpdateTodoRequest {
  id: number;
  title?: string;
  description?: string;
  completed?: boolean;
  dueDate?: Date;
  category?: TodoCategory;
  priority?: TodoPriority;
}

export type TodoCategory =
  | 'work'
  | 'personal'
  | 'shopping'
  | 'health'
  | 'education'
  | 'other';

export type TodoPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface CategoryOption {
  value: TodoCategory;
  label: string;
  icon: string;
  color: string;
}

export interface PriorityOption {
  value: TodoPriority;
  label: string;
  icon: string;
  color: string;
}

export type TodoFilter = 'all' | 'active' | 'completed';
