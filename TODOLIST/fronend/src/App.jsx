import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App(){
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <header style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </header>

      <Routes>
        <Route path="/" element={<div><h2>Welcome to Todo App</h2></div>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
