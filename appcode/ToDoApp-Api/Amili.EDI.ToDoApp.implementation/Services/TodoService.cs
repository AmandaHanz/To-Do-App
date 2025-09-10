using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TodoApp.Data;
using ToDoApp.Models;

namespace TodoApp.Services
{
    public class TodoService : ITodoService
    {
        private readonly TodoDbContext _context;
        private readonly ILogger<TodoService> _logger;

        public TodoService(TodoDbContext context, ILogger<TodoService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<List<Todo>> GetTodosAsync()
        {
            try
            {
                return await _context.Todos
                    .OrderByDescending(t => t.CreatedAt)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching todos.");
                return new List<Todo>();
            }
        }

        public async Task<Todo?> CreateTodoAsync(CreateTodoReq request)
        {
            try
            {
                var todo = new Todo
                {
                    Title = request.Title,
                    Description = request.Description,
                    DueDate = request.DueDate,
                    Category = request.Category ?? "other",
                    Priority = request.Priority ?? "medium",
                    Completed = false,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.Todos.Add(todo);
                await _context.SaveChangesAsync();
                return todo;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating todo: {@Request}", request);
                return null;
            }
        }

        public async Task<Todo?> UpdateTodoAsync(UpdateTodoReq request)
        {
            try
            {
                var todo = await _context.Todos.FindAsync(request.Id);
                if (todo == null) return null;

                if (!string.IsNullOrEmpty(request.Title)) todo.Title = request.Title;
                if (request.Description != null) todo.Description = request.Description;
                if (request.Completed.HasValue) todo.Completed = request.Completed.Value;
                if (request.DueDate.HasValue) todo.DueDate = request.DueDate;
                if (!string.IsNullOrEmpty(request.Category)) todo.Category = request.Category;
                if (!string.IsNullOrEmpty(request.Priority)) todo.Priority = request.Priority;

                todo.UpdatedAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();

                return todo;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating todo with ID {Id}", request.Id);
                return null;
            }
        }

        public async Task<Todo?> ToggleTodo(int id)
        {
            try
            {
                var todo = await _context.Todos.FindAsync(id);
                if (todo == null) return null;

                todo.Completed = !todo.Completed;
                todo.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();
                return todo;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error toggling completion for todo with ID {Id}", id);
                return null;
            }
        }

        public async Task<bool> DeleteTodo(int id)
        {
            try
            {
                var todo = await _context.Todos.FindAsync(id);
                if (todo == null) return false;

                _context.Todos.Remove(todo);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting todo with ID {Id}", id);
                return false;
            }
        }

        public async Task<bool> ClearCompleted()
        {
            try
            {
                var completed = await _context.Todos
                    .Where(t => t.Completed)
                    .ToListAsync();

                _context.Todos.RemoveRange(completed);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error clearing completed todos.");
                return false;
            }
        }
    }
}
