import React, { useState } from 'react';
import { api } from './api';
import { useNavigate } from 'react-router-dom';
import './App.css';


function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    faculty_id: '',
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/register', formData);
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      alert('Registration Failed');
    }
  }

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="faculty_id" placeholder="Faculty ID" onChange={handleChange} required /><br/>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required /><br/>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
