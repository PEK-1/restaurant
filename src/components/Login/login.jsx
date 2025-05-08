import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../authslice';
import { SubHeading } from '..';
import { images } from '../../constants';
import { FaHamburger } from 'react-icons/fa';
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
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
      if (formData.email === 'admin@gmail.com' && formData.password === 'Admin') {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate('/admin');
        }, 2000);
        return;
      }
      try {
        const response = await fetch('http://localhost:3001/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.error || 'Login failed.');
          return;
        }

        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          dispatch(loginSuccess(data.user));
          navigate('/home');
        }, 20000);
      } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleSwitchToRegister = () => {
    navigate('/register');
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
        <button className='switch-to-register-button' onClick={handleSwitchToRegister}>
          Switch To Register
        </button>
        </form>
      </div>

      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <FaHamburger className='modal-icon' />
            <h2>Login successful!</h2>
            <p2>Redirecting you ti the dashboard...</p2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
