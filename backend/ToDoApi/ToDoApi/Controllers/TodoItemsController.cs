using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoApi.Data;
using ToDoApi.Models;

namespace ToDoApi.Controllers
{
    // Definerer ruten for API'et og markerer denne controller som en der reagerer på web API-anmodninger.
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TodoController(AppDbContext context)
        {
            _context = context;
        }


        // Håndterer GET-anmodninger for at hente alle todo-elementer.
        [HttpGet]
        public ActionResult<IEnumerable<TodoItem>> GetTodoItems()
        {
            return _context.TodoItems.ToList();
        }

        // Håndterer GET-anmodninger med en specifik id for at hente et enkelt todo-element.
        [HttpGet("{id}")]
        public ActionResult<TodoItem> GetTodoItem(int id)
        {
            var todoItem = _context.TodoItems.Find(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        // Håndterer POST-anmodninger for at oprette et nyt todo-element.
        [HttpPost]
        public ActionResult<TodoItem> PostTodoItem(TodoItem todoItem)
        {
            if (todoItem == null)
            {
                return BadRequest("TodoItem object is null");
            }

            todoItem.Id = 0; 

            todoItem.CreatedAt = DateTime.Now;

            _context.TodoItems.Add(todoItem);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
        }


        // Håndterer PUT-anmodninger med en specifik id for at opdatere et eksisterende todo-element.
        [HttpPut("{id}")]
        public IActionResult PutTodoItem(int id, TodoItem todoItem)
        {
            if (id != todoItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(todoItem).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // Håndterer DELETE-anmodninger med en specifik id for at slette et todo-element.
        [HttpDelete("{id}")]
        public IActionResult DeleteTodoItem(int id)
        {
            var todoItem = _context.TodoItems.Find(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todoItem);
            _context.SaveChanges();

            return NoContent();
        }

        // Hjælpefunktion som tjekker om et todo-element eksisterer baseret på id'et.
        private bool TodoItemExists(int id)
        {
            return _context.TodoItems.Any(e => e.Id == id);
        }
    }
}
