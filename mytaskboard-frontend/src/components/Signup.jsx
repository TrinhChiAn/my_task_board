import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { Form, Input, Button, ErrorMessage, Container } from '../styles/components';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const signup = useAuthStore((state) => state.signup);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      navigate('/boards');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2 style={{ 
          color: '#2c3e50',
          fontSize: '28px',
          textAlign: 'center',
          marginBottom: '30px'
        }}>Create Account</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div>
          <label style={{ color: '#495057', marginBottom: '8px', display: 'block' }}>
            Username
          </label>
          <Input
            type="text"
            name="username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={{ color: '#495057', marginBottom: '8px', display: 'block' }}>
            Password
          </label>
          <Input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={{ color: '#495057', marginBottom: '8px', display: 'block' }}>
            Email
          </label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={{ color: '#495057', marginBottom: '8px', display: 'block' }}>
            Full Name
          </label>
          <Input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" style={{ marginTop: '10px' }}>
          Sign Up
        </Button>
        <p style={{ 
          textAlign: 'center', 
          marginTop: '20px',
          color: '#6c757d'
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{ 
            color: '#007bff', 
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            Login
          </Link>
        </p>
      </Form>
    </Container>
  );
};

export default Signup; 