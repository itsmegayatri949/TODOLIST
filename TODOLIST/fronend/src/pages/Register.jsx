import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div><input name="name" placeholder="Name" value={form.name} onChange={handleChange} required /></div>
        <div><input name="email" placeholder="Email" value={form.email} onChange={handleChange} type="email" required /></div>
        <div><input name="password" placeholder="Password" value={form.password} onChange={handleChange} type="password" required /></div>
        <button type="submit">Register</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
}
