import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateProfileMutation } from '../../redux/api/userApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import UserLayout from '../layout/UserLayout';
import MetaData from '../layout/MetaData';

const UpdateProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const [updateProfile, { isLoading, error, isSuccess }] = useUpdateProfileMutation();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setName(user?.name || '');
      setEmail(user?.email || '');
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success('Profile updated successfully');
      navigate('/me/profile');
    }
  }, [user, error, isSuccess, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    updateProfile({ name, email });
  };

  return (
    <UserLayout>
        <MetaData title={"Update Profile"} />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6">
            <div className="card shadow-sm border-0 p-4">
              <h2 className="mb-4 text-center fw-bold">Update Profile</h2>

              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label htmlFor="name_field" className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email_field" className="form-label fw-semibold">Email Address</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-danger fw-semibold py-2"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Updating...' : 'Update Profile'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UpdateProfile;
