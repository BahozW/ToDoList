export type TodoItem = {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
};

const apiBaseUrl = 'https://localhost:7078/api/Todo';

const headers = {
  'Content-Type': 'application/json'
};

// Henter alle todo items fra serveren
export const getTodoItems = async (): Promise<TodoItem[]> => {
  const response = await fetch(apiBaseUrl);
  const items = await response.json();
  return items.map((item: TodoItem) => ({ ...item, createdAt: new Date(item.createdAt) })); // Add type annotation here
};

// Opretter et nyt todo item
export const createTodoItem = async (todoItem: TodoItem): Promise<TodoItem> => {
  const response = await fetch(apiBaseUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...todoItem, createdAt: todoItem.createdAt.toISOString() })
  });
  const newItem = await response.json();
  return { ...newItem, createdAt: new Date(newItem.createdAt) };
};

// Opdaterer et eksisterende todo item
export const updateTodoItem = async (id: number, todoItem: TodoItem): Promise<void> => {
  await fetch(`${apiBaseUrl}/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...todoItem, createdAt: todoItem.createdAt.toISOString() })
  });
};

// Sletter et todo item
export const deleteTodoItem = async (id: number): Promise<void> => {
  await fetch(`${apiBaseUrl}/${id}`, {
    method: 'DELETE',
    headers
  });
};
