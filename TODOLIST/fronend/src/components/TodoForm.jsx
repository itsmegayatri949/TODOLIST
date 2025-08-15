import React, { useState, useEffect } from 'react';

export default function TodoForm({ onSubmit, initial = { title: '', description: '' }, submitLabel = 'Add' }) {
  const [form, setForm] = useState(initial);

  useEffect(() => setForm(initial), [initial]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit(form);
    setForm({ title: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <button type="submit">{submitLabel}</button>
    </form>
  );
}
