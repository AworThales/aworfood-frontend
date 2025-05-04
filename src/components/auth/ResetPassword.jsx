import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../../redux/api/userApi';
import MetaData from '../layout/MetaData';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  const [resetPassword, { isLoading, error, isSuccess }] = useResetPasswordMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    if (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }

    if (isSuccess) {
      toast.success('Password has been reset successfully!');
      navigate('/login');
    }
  }, [error, isSuccess, isAuthenticated, navigate]);

  // Basic form validation
  const validateForm = () => {
    const newErrors = {};

    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const token = params?.token;
    resetPassword({ token, body: { password, confirmPassword } });
  };

  return (
    <>
      <MetaData title="Reset Password" />
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="row justify-content-center w-100">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5">
            <form
              onSubmit={submitFormHandler}
              className="shadow rounded p-4 bg-white"
            >
              <h2 className="text-center mb-4 text-danger fw-bold">Reset Password</h2>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password_field" className="form-label fw-semibold">
                  New Password
                </label>
                <input
                  type="password"
                  id="password_field"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label htmlFor="confirm_password_field" className="form-label fw-semibold">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm_password_field"
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">{errors.confirmPassword}</div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-danger w-100 py-2"
                disabled={isLoading}
              >
                {isLoading ? 'Resetting...' : 'Set New Password'}
              </button>

              {/* Back to Login */}
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

export default ResetPassword;