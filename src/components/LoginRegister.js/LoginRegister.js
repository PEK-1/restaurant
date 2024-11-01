import React, { useState } from 'react';
import { SubHeading } from '../../components';
import { images } from '../../constants';
import './LoginRegister.css'

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setErrors({}); 
    setFormData({ email: '', password: '', confirmPassword: '' }); 
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', formData);
      setFormData({ email: '', password: '', confirmPassword: '' }); 
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className='login-register'>
      <h1 className='app__header-h1'>Login in now to enhance your dining experience</h1>
      <SubHeading title='Login Now'/>
      <form onSubmit={handleSubmit}>
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
        
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={handleSwitch}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
      <div className='app__wrappper_img'>
      <img className='login-register_img' src={images.welcome} alt='header img'/>
    </div>
    </div>
  );
};

export default LoginRegister;
