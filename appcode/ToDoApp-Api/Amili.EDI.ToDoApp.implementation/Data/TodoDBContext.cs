using Microsoft.EntityFrameworkCore;

using ToDoApp.Models;

namespace TodoApp.Data
{
    public class TodoDbContext : DbContext
    {
        public TodoDbContext(DbContextOptions<TodoDbContext> options)
            : base(options)
        {
        }

        public DbSet<Todo> Todos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed data
            modelBuilder.Entity<Todo>().HasData(
                new Todo
                {
                    Id = 1,
                    Title = "Welcome to Enhanced TodoFlow!",
                    Description = "This todo demonstrates the new features: categories, priorities, and due dates.",
                    Category = "personal",
                    Priority = "high",
                    Completed = false,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    DueDate = DateTime.UtcNow.AddDays(1)
                },
                new Todo
                {
                    Id = 2,
                    Title = "Complete project presentation",
                    Description = "Prepare slides and practice the demo for the client meeting.",
                    Category = "work",
                    Priority = "urgent",
                    Completed = false,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    DueDate = DateTime.UtcNow.AddHours(2)
                }
            );
        }
    }
}

