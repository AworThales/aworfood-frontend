import React, { useEffect, useState } from 'react';
import { useLoginMutation } from '../../redux/api/authApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [login, { isLoading, error, isSuccess }] = useLoginMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    if (error) {
      toast.error(error?.data?.message || 'Login failed');
    } else if (isSuccess) {
      toast.success('Login successful');
    }
  }, [error, isSuccess, isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    login({ email, password });
  };

  return (
    <>
      <MetaData title={'Login'} />
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="row justify-content-center w-100">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5">
            <form onSubmit={submitFormHandler} className="shadow rounded p-4 bg-white">
              <h2 className="text-center mb-4 text-danger fw-bold">Login</h2>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email_field" className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password_field" className="form-label fw-semibold">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password_field"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
              </div>

              {/* Forgot Password */}
              <div className="d-flex justify-content-end mb-3">
                <Link to={"/password/forgot"} className="text-decoration-none small text-danger">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-danger w-100 py-2" disabled={isLoading}>
                {isLoading ? 'Authenticating...' : 'Login'}
              </button>

              {/* New User Link */}
              <div className="text-center mt-3">
                <span className="small">New Account?</span>{' '}
                <Link to={"/register"} className="text-decoration-none text-danger small">
                  Register Here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
