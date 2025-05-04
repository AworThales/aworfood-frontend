import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useUpdatePasswordMutation } from '../../redux/api/userApi';
import UserLayout from '../layout/UserLayout';
import MetaData from '../layout/MetaData';

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  
  const navigate = useNavigate();
  const [updatePassword, { isLoading, error, isSuccess }] = useUpdatePasswordMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success('Password updated successfully');
      navigate('/me/profile');
    }
  }, [error, isSuccess, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    updatePassword({ oldPassword: oldPassword, password: password });
  };

  return (
    <UserLayout>
        <MetaData title={"Update Password"} />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <form className="card shadow-sm border-0 p-4 bg-white" onSubmit={submitHandler}>
              <h2 className="mb-4 text-center fw-bold">Update Password</h2>

              {/* Old Password Field */}
              <div className="mb-3 position-relative">
                <label htmlFor="old_password_field" className="form-label fw-semibold">
                  Old Password
                </label>
                <input
                  type={showPasswords ? 'text' : 'password'}
                  id="old_password_field"
                  className="form-control"
                  placeholder="Enter old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>

              {/* New Password Field */}
              <div className="mb-3 position-relative">
                <label htmlFor="new_password_field" className="form-label fw-semibold">
                  New Password
                </label>
                <input
                  type={showPasswords ? 'text' : 'password'}
                  id="new_password_field"
                  className="form-control"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Show/Hide Password Toggle */}
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="showPasswordsToggle"
                  checked={showPasswords}
                  onChange={() => setShowPasswords(!showPasswords)}
                />
                <label className="form-check-label" htmlFor="showPasswordsToggle">
                  Show Passwords
                </label>
              </div>

              {/* Submit Button */}
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-danger fw-semibold py-2"
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UpdatePassword;
