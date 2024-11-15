import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../authslice';
import { SubHeading } from '../../components';
import { images } from '../../constants';
import './LoginRegister.css'
import { selectIsAuthenticated, selectUser } from '../../authslice';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [registered, setregistered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
    
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      dispatch(loginSuccess({ email: userEmail }));
      navigate('/home');
    }
  }, [dispatch, navigate]);
  
  useEffect(() => {
    if (isAuthenticated && !registered) {
      navigate('/home');
    }
  }, [isAuthenticated, registered, navigate]);
  
  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setErrors({}); 
  };

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

    if (!isLogin && !confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const endpoint = isLogin ? '/api/login' : '/api/register';
        console.log('Sending request to:', endpoint);
        const response = await fetch(`http://localhost:5000${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
  
        const data = await response.json();
        console.log('Login response:', data);
  
        if (!response.ok) {
          setErrors({ password: data.error });
          alert(data.error);
          return;
        }
  
        if (isLogin) {
          console.log('Logged in successfully:', data.user);
          dispatch(loginSuccess(data.user));
          localStorage.setItem('userEmail', data.user.email);
          navigate('/home');
        } else {
          console.log('Registered successfully');
          alert('Registration successful! Now you can login.');
          handleSwitch();
        }
  
        setFormData({ email: '', password: '', confirmPassword: '' });
      } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
      }
    } else {
      setErrors(validationErrors);
    }
  };
  
  
  return (
  <div className='login-register-background' style={{ backgroundImage: `url(${images.LoginBg})` }}>
    <div className='login-register-container'>
      <div className='login-register-content'>
      <SubHeading  title='Login Now'/>
      <h1 className='headtext__cormorant'>Login in now to enhance your dining experience</h1>
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
        
        {!isLogin && (
          <>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              />
            {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}
          </>
        )}
        
      <button  className='login-button' type="submit">{isLogin ? 'Login' : 'Register'}</button>
      <button className='switch-button' onClick={handleSwitch}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
      </form>
    </div>
  </div>
  );
};

export default LoginRegister;
