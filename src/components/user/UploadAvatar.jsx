import React, { useEffect, useState } from 'react';
import UserLayout from '../layout/UserLayout';
import { useNavigate } from 'react-router-dom';
import { useUploadAvatarMutation } from '../../redux/api/userApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';

const UploadAvatar = () => {
  const { user } = useSelector((state) => state.auth);

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar ? user?.avatar?.url : '/images/default_avatar.jpg'
  );

  const navigate = useNavigate();
  const [uploadAvatar, { isLoading, error, isSuccess }] = useUploadAvatarMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success('Avatar uploaded successfully');
      navigate('/me/profile');
    }
  }, [error, isSuccess, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    uploadAvatar({ avatar });
  };

  const onChangeAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <UserLayout>
        <MetaData title={"Update Avatar"} />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <form
              className="card shadow-sm border-0 p-4 bg-white"
              onSubmit={submitHandler}
              encType="multipart/form-data"
            >
              <h2 className="mb-4 text-center fw-bold">Upload Avatar</h2>

              <div className="mb-4 text-center">
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="rounded-circle img-thumbnail shadow"
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="customFile" className="form-label fw-semibold">
                  Choose a new avatar
                </label>
                <input
                  type="file"
                  name="avatar"
                  className="form-control"
                  id="customFile"
                  accept="image/*"
                  onChange={onChangeAvatar}
                  required
                />
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-danger fw-semibold py-2"
                  disabled={isLoading}
                >
                  {isLoading ? 'Uploading...' : 'Upload Avatar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UploadAvatar;
