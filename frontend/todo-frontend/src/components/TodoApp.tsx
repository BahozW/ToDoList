import React, { useEffect, useState } from 'react';
import { TodoItem, getTodoItems, createTodoItem, updateTodoItem, deleteTodoItem } from '../services/todoService';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import LoadingComponent from './LoadingComponent';
import ErrorComponent from './ErrorComponent';
import '../styles.css';

const TodoApp: React.FC = () => {
  // State hooks til at gemme todos, loading status og redigering af en todo
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Henter todos når komponenten mountes
  useEffect(() => {
    getTodoItems().then((data) => {
      setTodos(data);
      setIsLoading(false);
    })
    .catch((err) => {
      setError('Der opstod en fejl ved indlæsning af todos'); 
      setIsLoading(false);
    });
  }, []);

  // Håndterer oprettelse og opdatering af todos
  const handleCreateOrUpdateTodo = (todoItem: TodoItem) => {
    if (todoItem.id === 0) {
      createTodoItem(todoItem).then((newTodo) => {
        setTodos([...todos, newTodo]);
      });
    } else {
      updateTodoItem(todoItem.id, todoItem).then(() => {
        setTodos(todos.map((todo) => (todo.id === todoItem.id ? todoItem : todo)));
      });
    }
    setEditingTodo(null);
  };

  // Håndterer sletning af todos
  const handleDeleteTodo = (id: number) => {
    deleteTodoItem(id).then(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
    });
  };

  // Håndterer opdatering af todo-status
  const handleCheckboxUpdate = (id: number, updatedTodo: TodoItem) => {
    setTodos(todos.map((todo) => todo.id === id ? updatedTodo : todo));
  };

  // Sætter en todo til redigering
  const handleEditTodo = (id: number, todo: TodoItem) => {
    setEditingTodo(todo);
  };

  // Viser loading-komponent, mens data hentes
  if (isLoading) {
    return <LoadingComponent />; 
  }

  // Funktion der rydder fejl
  const clearError = () => setError(null);

  // Hvis der er en fejl, vis ErrorComponent
  if (error) {
    return <ErrorComponent message={error} onClearError={clearError} />;
  }

  // Hovedkomponenten, der renderer todo-applikationen
  return (
    <div className='todo-app'>
      <h1>Todo Liste</h1>
      <TodoForm todo={editingTodo} onCreateOrUpdate={handleCreateOrUpdateTodo} />
      <TodoList todos={todos} onDelete={handleDeleteTodo} onEdit={handleEditTodo} onCheckboxUpdate={handleCheckboxUpdate} />
    </div>
  );
};

export default TodoApp;
