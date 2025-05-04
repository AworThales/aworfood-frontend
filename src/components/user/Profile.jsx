import React from 'react';
import UserLayout from '../layout/UserLayout';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const capitalizeFirstLetter = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <UserLayout>
       <MetaData title={" Profile"} />
      <div className="row justify-content-center align-items-center mt-4 g-5">
        {/* Avatar Section */}
        <div className="col-12 col-md-4 text-center">
          <figure className="avatar-profile mb-3">
            <img
              className="rounded-circle shadow"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              src={user?.avatar ? user?.avatar?.url : '/images/default_avatar.jpg'}
              alt={user?.name}
            />
          </figure>
          <h5 className="fw-bold mt-2">{capitalizeFirstLetter(user?.name)}</h5>
        </div>

        {/* Info Section */}
        <div className="col-12 col-md-6">
          <div className="card shadow border-0 p-4">
            <h4 className="mb-3 border-bottom pb-2">User Information</h4>

            <div className="mb-3">
              <strong>Full Name:</strong>
              <p className="text-muted mb-0">{capitalizeFirstLetter(user?.name)}</p>
            </div>

            <div className="mb-3">
              <strong>Email Address:</strong>
              <p className="text-muted mb-0">{user?.email}</p>
            </div>

            <div>
              <strong>Joined On:</strong>
              <p className="text-muted mb-0">
                {user?.createdAt?.substring(0, 10)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Profile;
