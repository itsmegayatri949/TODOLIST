import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const res = await api.get('/todos');
      setTodos(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setError('Failed to load todos');
      }
    }
  };

  useEffect(() => { fetchTodos(); }, []);

  const handleCreate = async (data) => {
    try {
      const res = await api.post('/todos', data);
      setTodos(prev => [res.data, ...prev]);
    } catch (err) {
      setError('Failed to create todo');
    }
  };

  const handleToggle = async (todo) => {
    try {
      const res = await api.put(`/todos/${todo._id}`, { completed: !todo.completed });
      setTodos(prev => prev.map(t => (t._id === res.data._id ? res.data : t)));
    } catch {
      setError('Failed to update');
    }
  };

  const handleEdit = (todo) => setEditing(todo);

  const handleUpdate = async (data) => {
    try {
      const res = await api.put(`/todos/${editing._id}`, data);
      setTodos(prev => prev.map(t => (t._id === res.data._id ? res.data : t)));
      setEditing(null);
    } catch {
      setError('Failed to update');
    }
  };

  const handleDelete = async (todo) => {
    try {
      await api.delete(`/todos/${todo._1d || todo._id}`);
      setTodos(prev => prev.filter(t => t._id !== todo._id));
    } catch {
      setError('Failed to delete');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h2>My Todos</h2>
      <div style={{ marginBottom: 10 }}>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {editing ? (
        <>
          <h3>Edit Todo</h3>
          <TodoForm initial={{ title: editing.title, description: editing.description }} onSubmit={handleUpdate} submitLabel="Update" />
          <button onClick={() => setEditing(null)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>Create Todo</h3>
          <TodoForm onSubmit={handleCreate} />
        </>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        {todos.length === 0 ? <p>No todos yet</p> : todos.map(todo => (
          <TodoItem key={todo._id} todo={todo} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
