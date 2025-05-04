import React, { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useMyOrdersQuery } from '../../redux/api/orderApi';
import LoadingSpinner from '../layout/LoadingSpinner';
import MetaData from '../layout/MetaData';
import { MDBDataTable } from "mdbreact";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/features/cartSlice';

const MyOrders = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderSuccess = queryParams.get('order_success');  // Check for the query parameter
  
  const dispatch = useDispatch();
  const handledRedirect = useRef(false);  // Use Ref to handle redirect only once

  const { data, isLoading, error } = useMyOrdersQuery();

  // Effect to handle order success and reset state
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || 'Failed to load orders');
    }

    // Handle redirect after successful order only once
    if (orderSuccess === 'true' && !handledRedirect.current) {
      handledRedirect.current = true;  // Mark as handled
      dispatch(clearCart());  // Clear cart after successful order
      toast.success("Order Placed Successfully");
      
      // Remove query param from URL by navigating with 'replace'
      navigate("/me/orders", { replace: true });
    }
  }, [error, orderSuccess, dispatch, navigate]);

  // Function to set orders data for the MDB DataTable
  const setOrders = () => {
    const orders = {
      columns: [
        { label: "Order Id", field: "id", sort: "asc" },
        { label: "Food Name", field: "name", sort: "asc" },
        { label: "Amount", field: "amount", sort: "asc" },
        { label: "Payment Status", field: "status", sort: "asc" },
        { label: "Order Status", field: "orderStatus", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };

    data?.orders?.forEach((order) => {
      orders.rows.push({
        id: order?._id,
        name: order?.orderItems?.[0]?.name || 'N/A',
        amount: `$${Number(order?.totalAmount).toFixed(2)}`,
        status: (
          <span className={`badge ${order?.paymentInfo?.status === "paid" ? "bg-success" : "bg-warning"}`}>
            {order?.paymentInfo?.status?.toUpperCase()}
          </span>
        ),
        orderStatus: (
          <span className={`badge ${order?.orderStatus === "Delivered" ? "bg-primary" : "bg-secondary"}`}>
            {order?.orderStatus}
          </span>
        ),
        actions: (
          <div className="d-flex gap-2 justify-content-center">
            <Link to={`/me/order/${order?._id}`} className='btn btn-outline-primary' title="View Order">
              <li className="fa fa-eye"></li>
            </Link>
            <Link to={`/invoice/order/${order?._id}`} className='btn btn-outline-success ms-2' title="Print Invoice">
              <li className="fa fa-print"></li>
            </Link>
          </div>
        ),
      });
    });

    return orders;
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <MetaData title="My Orders" />
      <h3 className="fw-bold my-5">
        You have {data?.orders?.length || 0} {data?.orders?.length === 1 ? "order" : "orders"}
      </h3>
      <MDBDataTable
        data={setOrders()}
        className="px-3 table table-hover"
        bordered
        striped
        responsive
        hover
      />
    </div>
  );
};

export default MyOrders;
