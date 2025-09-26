import React, { useState } from 'react';
import { api } from './api';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', formData);
      alert(res.data.message);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('faculty_name', res.data.name);
      navigate('/dashboard');  // Redirect to Dashboard after Login
    } catch (err) {
      alert('Login Failed');
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required/><br/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required/><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
