import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../authslice';
import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const { email, password } = formData;

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.error || 'Login failed.');
          return;
        }

        alert('Login successful!');
        dispatch(loginSuccess(data.user)); // Update Redux store
        navigate('/home'); // Navigate to the home page
      } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className='login-background' style={{ backgroundImage: `url(${images.LoginBg})` }}>
      <div className='login-container'>
        <div className='login-content'>
          <SubHeading title="Login Now" />
          <h1 className='headtext__cormorant'>Login to enhance your dining experience</h1>
        </div>

        <form className='login-form' onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}

          <button className='login-button' type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
