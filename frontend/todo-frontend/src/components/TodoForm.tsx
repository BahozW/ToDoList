import React, { useState, useEffect } from 'react';
import { TodoItem } from '../services/todoService';
import ErrorComponent from './ErrorComponent'; 
import '../styles.css';

type Props = {
  todo?: TodoItem | null;
  onCreateOrUpdate: (todoItem: TodoItem) => void;
};

const TodoForm: React.FC<Props> = ({ todo, onCreateOrUpdate }) => {
  const [newTodo, setNewTodo] = useState<TodoItem>({ id: 0, title: '', isCompleted: false, createdAt: new Date() });
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    if (todo) {
      // Sætter den valgte todo til redigering
      setNewTodo(todo);
    } else {
      // Nulstiller formen for at oprette en ny todo
      setNewTodo({ id: 0, title: '', isCompleted: false, createdAt: new Date() });
    }
  }, [todo]);

  const handleCreateOrUpdate = () => {
    if (newTodo.title.trim() === '') {
      // Sætter en fejl, hvis titlen er tom
      setError('Titlen må ikke være tom');
      return;
    }

    // Rydder eventuelle eksisterende fejl
    setError(null);

    console.log('Creating/Updating Todo with date:', newTodo.createdAt);
    onCreateOrUpdate(newTodo);
    if (newTodo.id === 0) {
      // Nulstiller formen efter oprettelse af en ny todo
      setNewTodo({ id: 0, title: '', isCompleted: false, createdAt: new Date() });
    }
  };

  // Funktion der rydder fejl
  const clearError = () => setError(null);

  // Hvis der er en fejl, vis ErrorComponent
  if (error) {
    return <ErrorComponent message={error} onClearError={clearError} />;
  }

  return (
    <div className='todo-form'>
      <input
        type="text"
        placeholder="Indtast en ny todo"
        value={newTodo.title}
        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
      />
      {todo && (
        <input
          type="date"
          value={newTodo.createdAt.toISOString().split('T')[0]}
          onChange={(e) => setNewTodo({ ...newTodo, createdAt: new Date(e.target.value) })}
        />
      )}
      <button onClick={handleCreateOrUpdate}>{todo ? 'Opdater' : 'Opret'}</button>
    </div>
  );
};

export default TodoForm;
