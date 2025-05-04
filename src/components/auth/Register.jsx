import React, { useEffect, useState } from 'react';
import { useRegisterMutation } from '../../redux/api/authApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';

const Register = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const { name, email, password } = user;

    const [register, { isLoading, error, isSuccess, data }] = useRegisterMutation();
    // console.log(data)
    const { isAuthenticated } = useSelector((state)=> state.auth)



  useEffect(() => {
    if (isAuthenticated) {
        navigate("/")
    }

    if (error) {
      toast.error(error?.data?.message || 'Registration failed');
    } else if (isSuccess) {
      toast.success('Registration successful');
    }
  }, [error, isSuccess, isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitRegisterFormHandler = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    register({ name, email, password });
  };

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
     <MetaData title={" Register"} />
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="row justify-content-center w-100">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5">
            <form onSubmit={submitRegisterFormHandler} className="shadow rounded p-4 bg-white">
              <h2 className="text-center mb-4 text-danger">Register</h2>

              {/* Name */}
              <div className="mb-3">
                <label htmlFor="name_field" className="form-label fw-semibold">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  name="name"
                  value={name}
                  onChange={onChangeHandler}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email_field" className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  name="email"
                  value={email}
                  onChange={onChangeHandler}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password_field" className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  name="password"
                  value={password}
                  onChange={onChangeHandler}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-danger w-100 py-2" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'REGISTER'}
              </button>

              {/* Already Have Account */}
              <div className="text-center mt-3">
                <span className="small">Already have an account?</span>{' '}
                <a href="/login" className="text-decoration-none text-danger small">
                  Login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
