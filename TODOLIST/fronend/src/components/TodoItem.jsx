import React from 'react';

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  return (
    <div style={{ display:'flex', gap:10, alignItems:'center', padding:8, borderBottom:'1px solid #ddd' }}>
      <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo)} />
      <div style={{ flex: 1 }}>
        <strong style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</strong>
        <div style={{ fontSize: 12 }}>{todo.description}</div>
      </div>
      <button onClick={() => onEdit(todo)}>Edit</button>
      <button onClick={() => onDelete(todo)}>Delete</button>
    </div>
  );
}
