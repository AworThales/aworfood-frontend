import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import LoadingSpinner from '../layout/LoadingSpinner';
import MetaData from '../layout/MetaData';
import { MDBDataTable} from "mdbreact"
import { Link } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import { useDeleteOrderMutation, useGetAdminOrdersQuery } from '../../redux/api/orderApi';

const ListsOrders = () => {
    
    const { data, isLoading, error } = useGetAdminOrdersQuery();

    const [deleteOrder, {isLoading: isDeleteLoading, error: deleteError, isSuccess: deleteSuccess}] = useDeleteOrderMutation()
   
    useEffect(() => {
    if (error) {
        toast.error(error?.data?.message );
    } 

    if(deleteError) {
        toast.error(deleteError?.data.message)
    }

    if(deleteSuccess) {
        toast.success("Order deleted successfully")
    }

    }, [error, deleteError, deleteSuccess]);

    const deleteOrderHandler = (id) => {
        deleteOrder(id);
    }

      const setOrders = () => {
        const orders = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Payment Status",
                    field: "paymentStatus",
                    sort: "asc",
                },
                {
                    label: "Order Status",
                    field: "orderStatus",
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

        data?.orders?.forEach((order) => {
            orders.rows.push({
                id: order?._id,
                paymentStatus: order?.paymentInfo?.status?.toUpperCase(),
                orderStatus: order?.orderStatus,
                actions: 
                    <div className="d-flex gap-2 justify-content-center">
                        <Link to={`/admin/orders/${order?._id}`} className='btn btn-outline-primary' title="Edit Order">
                            <li className="fa fa-pencil"></li>
                        </Link>
                        
                        <button 
                            onClick={() => deleteOrderHandler(order?._id)}
                            disabled={isDeleteLoading} 
                            className='btn btn-outline-danger ms-2' 
                            title="Delete Order"
                        >
                            <li className="fa fa-trash"></li>
                        </button>
                    </div>
            })
        })

        return orders;
      };
      

      if (isLoading) return <LoadingSpinner />
    

  return (
    <AdminLayout>
        <MetaData title="All Orders" />
         <h3 className="fw-bold my-5">
            You have {data?.orders?.length || 0} {data?.orders?.length === 1 ? "Order" : "Orders"}
          </h3>

        <MDBDataTable
            data={setOrders()}
            className="px-3 table table-hover"
            bordered
            striped
            responsive
            hover
         />
      
    </AdminLayout>
  )
}

export default ListsOrders
