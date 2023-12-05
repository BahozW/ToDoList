import React, { useState } from 'react';
import { TodoItem, updateTodoItem } from '../services/todoService';
import ErrorComponent from './ErrorComponent'; 
import '../styles.css';

type Props = {
  todos: TodoItem[];
  onDelete: (id: number) => void;
  onEdit: (id: number, todo: TodoItem) => void;
  onCheckboxUpdate: (id: number, updatedTodo: TodoItem) => void;
};

const TodoList: React.FC<Props> = ({ todos, onDelete, onEdit, onCheckboxUpdate }) => {
  const [error, setError] = useState<string | null>(null); 

  const handleCheckboxChange = (todo: TodoItem) => {
    const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };

    updateTodoItem(todo.id, updatedTodo)
      .then(() => {
        onCheckboxUpdate(todo.id, updatedTodo);
        setError(null); // Rydder eventuelle eksisterende fejl
      })
      .catch(() => {
        // Sætter en fejlbesked hvis opdateringen fejler
        setError('Fejl ved opdatering af todo-status');
      });
  };

  // Funktion der rydder fejl
  const clearError = () => setError(null);

  // Hvis der er en fejl, vis ErrorComponent
  if (error) {
    return <ErrorComponent message={error} onClearError={clearError} />;
  }

  return (
    <ul className='todo-list'>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => handleCheckboxChange(todo)}
          />
          <div className="todo-content">
            <span className="todo-title">{todo.title}</span>
            <span className="todo-date"> - Dato: {new Date(todo.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="todo-buttons">
            <button className="edit" onClick={() => onEdit(todo.id, todo)}>Rediger</button>
            <button className="delete" onClick={() => onDelete(todo.id)}>Slet</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
