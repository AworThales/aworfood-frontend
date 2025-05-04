import React, { useEffect, useState } from 'react';
import AdminLayout from '../layout/AdminLayout';
import MetaData from '../layout/MetaData';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../redux/api/userApi';

const UpdateUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    
    const navigate = useNavigate();
    const params = useParams();

    const [updateUser, { isLoading, error, isSuccess }] = useUpdateUserMutation();
    const { data } = useGetUserDetailsQuery(params?.id);

    useEffect(() => {
        if (data?.user) {
            setName(data?.user?.name || '');
            setEmail(data?.user?.email || '');
            setRole(data?.user?.role || '');
        }
    }, [data]);

    useEffect(() => {
        if (error) toast.error(error?.data?.message);
        if (isSuccess) {
            toast.success('User updated successfully');
            navigate('/admin/users');
        }
    }, [error, isSuccess, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        updateUser({ id: params?.id, body: { name, email, role } });
    };

    return (
        <AdminLayout>
            <MetaData title="Update User" />

            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6">
                        <div className="card shadow-sm border-0 rounded-4 p-4">
                            <h2 className="mb-4 text-center fw-bold">Update User</h2>
                            
                            <form onSubmit={submitHandler}>
                                <div className="form-group mb-3">
                                    <label htmlFor="name_field" className="form-label fw-semibold">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control form-control-lg"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter full name"
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="email_field" className="form-label fw-semibold">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control form-control-lg"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email address"
                                        required
                                    />
                                </div>

                                <div className="form-group mb-4">
                                    <label htmlFor="role_field" className="form-label fw-semibold">Role</label>
                                    <select
                                        id="role_field"
                                        className="form-select form-select-lg"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        required
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-danger w-100 py-2 fs-5"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Updating...' : 'Update User'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default UpdateUser;
