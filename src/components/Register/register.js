import React, { useState } from 'react';
import { SubHeading } from '..';
import { useNavigate } from 'react-router-dom';
import { images } from '../../constants';
import { FaHamburger } from 'react-icons/fa';
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const { email, password, confirmPassword } = formData;

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.error || 'Registration failed.');
          return;
        }

        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          setFormData({ email: '', password: '',confirmPassword: ''});
          navigate('/login');
        }, 2000);

      } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleSwitchToLogin = () => {
    navigate('/login');
  };

  return (
    <div className='register-background' style={{ backgroundImage: `url(${images.LoginBg})` }}>
      <div className='register-container'>
        <div className='register-content'>
          <SubHeading title="Register Now" />
          <h1 className='headtext__cormorant'>Register to create an account</h1>
        </div>

        <form className='register-form' onSubmit={handleSubmit}>
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

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            />
          {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}

          <button className='register-button' type="submit">Register</button>
          <button className='switch-to-register-button' onClick={handleSwitchToLogin}>
          Switch To Login
        </button>
        </form>
      </div>

      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
          <FaHamburger className='modal-icon' />
            <h2>Registration successful!</h2>
            <p>Redirecting you to the login page...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
