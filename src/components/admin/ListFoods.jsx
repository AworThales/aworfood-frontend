import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import LoadingSpinner from '../layout/LoadingSpinner';
import MetaData from '../layout/MetaData';
import { MDBDataTable} from "mdbreact"
import { Link } from 'react-router-dom';
import { useDeleteFoodMutation, useGetAdminFoodsQuery } from '../../redux/api/foodApi';
import AdminLayout from '../layout/AdminLayout';

const ListFoods = () => {
    
    const { data, isLoading, error } = useGetAdminFoodsQuery();

    const [deleteFood, {isLoading: isDeleteLoading, error: deleteError, isSuccess: deleteSuccess}] = useDeleteFoodMutation()
   
    useEffect(() => {
    if (error) {
        toast.error(error?.data?.message );
    } 

    if(deleteError) {
        toast.error(deleteError?.data.message)
    }

    if(deleteSuccess) {
        toast.success("Food deleted successfully")
    }

    }, [error, deleteError, deleteSuccess]);

    const deleteFoodHandler = (id) => {
    deleteFood(id);
    }

      const setFoods = () => {
        const foods = {
            columns: [
                {
                    label: "Food Id",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Name",
                    field: "name",
                    sort: "asc",
                },
                {
                    label: "Price",
                    field: "price",
                    sort: "asc",
                },
                {
                    label: "Stock",
                    field: "stock",
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

        data?.foods?.forEach((food) => {
            foods.rows.push({
                id: food?._id,
                name: `${food?.name?.substring(0,15)}`,
                price: food?.price,
                stock: food?.stock,              
                actions: 
                    <div className="d-flex gap-2 justify-content-center">
                        <Link to={`/admin/foods/${food?._id}`} className='btn btn-outline-primary' title="Edit Food">
                            <li className="fa fa-pencil"></li>
                        </Link>
                        <Link to={`/admin/foods/${food?._id}/upload_images`} className='btn btn-outline-success ms-2' title="Upload Food Image">
                            <li className="fa fa-image"></li>
                        </Link>
                        <button onClick={() => deleteFoodHandler(food?._id)} disabled={isDeleteLoading} className='btn btn-outline-danger ms-2' title="Delete Food">
                            <li className="fa fa-trash"></li>
                        </button>
                    </div>
            })
        })

        return foods;
      };
      

      if (isLoading) return <LoadingSpinner />
    

  return (
    <AdminLayout>
        <MetaData title="All Foods" />
         <h3 className="fw-bold my-5">
            You have {data?.foods?.length || 0} {data?.foods?.length === 1 ? "Food" : "Foods"}
          </h3>

        <MDBDataTable
            data={setFoods()}
            className="px-3 table table-hover"
            bordered
            striped
            responsive
            hover
         />
      
    </AdminLayout>
  )
}

export default ListFoods
