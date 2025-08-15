import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div><input name="email" placeholder="Email" value={form.email} onChange={handleChange} type="email" required /></div>
        <div><input name="password" placeholder="Password" value={form.password} onChange={handleChange} type="password" required /></div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
}
