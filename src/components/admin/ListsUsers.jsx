import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import LoadingSpinner from '../layout/LoadingSpinner';
import MetaData from '../layout/MetaData';
import { MDBDataTable} from "mdbreact"
import { Link } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import { useDeleteUserMutation, useGetAdminUsersQuery } from '../../redux/api/userApi';

const ListsUsers = () => {
    
    const { data, isLoading, error } = useGetAdminUsersQuery();

    const [deleteUser, {isLoading: isDeleteLoading, error: deleteError, isSuccess: deleteSuccess}] = useDeleteUserMutation()
   
    useEffect(() => {
    if (error) {
        toast.error(error?.data?.message );
    } 

    if(deleteError) {
        toast.error(deleteError?.data.message)
    }

    if(deleteSuccess) {
        toast.success("User deleted successfully")
    }

    }, [error, deleteError, deleteSuccess]);

    const deleteUserHandler = (id) => {
        deleteUser(id);
    }

      const setUsers = () => {
        const users = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Name",
                    field: "name",
                    sort: "asc",
                },
                {
                    label: "Email",
                    field: "email",
                    sort: "asc",
                },
                {
                    label: "Role",
                    field: "role",
                    sort: "asc",
                },
                {
                    label: "Actions",
                    field: "actions",
                    sort: "asc",
                },
            ],
            rows: [],
        };

        data?.users?.forEach((user) => {
            users.rows.push({
                id: user?._id,
                name: user?.name?.toUpperCase(),
                email: user?.email,
                role: user?.role,
                actions: 
                    <div className="d-flex gap-2 justify-content-center">
                        <Link to={`/admin/users/${user?._id}`} className='btn btn-outline-primary' title="Edit User">
                            <li className="fa fa-pencil"></li>
                        </Link>
                        
                        <button 
                            onClick={() => deleteUserHandler(user?._id)}
                            disabled={isDeleteLoading} 
                            className='btn btn-outline-danger ms-2' 
                            title="Delete User"
                        >
                            <li className="fa fa-trash"></li>
                        </button>
                    </div>
            })
        })

        return users;
      };
      

      if (isLoading) return <LoadingSpinner />
    

  return (
    <AdminLayout>
        <MetaData title="All Users" />
         <h3 className="fw-bold my-5">
            You have {data?.users?.length || 0} {data?.users?.length === 1 ? "User" : "Users"}
          </h3>

        <MDBDataTable
            data={setUsers()}
            className="px-3 table table-hover"
            bordered
            striped
            responsive
            hover
         />
      
    </AdminLayout>
  )
}

export default ListsUsers
