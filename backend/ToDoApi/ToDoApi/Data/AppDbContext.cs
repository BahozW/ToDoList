using Microsoft.EntityFrameworkCore;
using ToDoApi.Models;
using System;
using System.Linq;

namespace ToDoApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; }

        // Data seeding
        public static void SeedData(AppDbContext context)
        {
            if (!context.TodoItems.Any())
            {
                context.TodoItems.AddRange(
                    new TodoItem { Title = "Task 1", IsCompleted = false, CreatedAt = DateTime.Now },
                    new TodoItem { Title = "Task 2", IsCompleted = true, CreatedAt = DateTime.Now }
                );

                context.SaveChanges();
            }
        }
    }
}