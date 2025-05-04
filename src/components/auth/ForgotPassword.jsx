import React, { useEffect, useState } from 'react';
import { useForgotPasswordMutation } from '../../redux/api/userApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import MetaData from '../layout/MetaData';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const [forgotPassword, { isLoading, error, isSuccess }] = useForgotPasswordMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    if (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    } else if (isSuccess) {
      toast.success('Email sent! Please check your inbox.');
    }
  }, [error, isSuccess, isAuthenticated, navigate]);

  const submitFormHandler = (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");
    forgotPassword({ email });
  };

  return (
    <>
      <MetaData title="Forgot Password" />
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="row justify-content-center w-100">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5">
            <form
              onSubmit={submitFormHandler}
              className="shadow rounded bg-white p-4"
            >
              <h2 className="text-center mb-4 text-danger fw-bold">
                Forgot Password
              </h2>

              <div className="mb-3">
                <label htmlFor="email_field" className="form-label fw-semibold">
                  Enter your email
                </label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-danger w-100 py-2"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Email'}
              </button>

              <div className="text-center mt-3">
                <a href="/login" className="text-decoration-none text-secondary small">
                  Back to Login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
