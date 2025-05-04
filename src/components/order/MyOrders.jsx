import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useMyOrdersQuery } from '../../redux/api/orderApi';
import LoadingSpinner from '../layout/LoadingSpinner';
import MetaData from '../layout/MetaData';
import { MDBDataTable } from "mdbreact";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/features/cartSlice';

const MyOrders = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const orderSuccess = searchParams.get("order_success");
  const { data, isLoading, error } = useMyOrdersQuery();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (orderSuccess === 'true') {
      dispatch(clearCart());
      toast.success("Order Placed Successfully");
      navigate("/me/orders", { replace: true }); // ✅ Clean URL
    }
  }, [error, orderSuccess, dispatch, navigate]);

  const setOrders = () => {
    const orders = {
      columns: [
        { label: "Order Id", field: "id", sort: "asc" },
        { label: "Food Name", field: "name", sort: "asc" },
        { label: "Amount", field: "amount", sort: "asc" },
        { label: "Payment Status", field: "status", sort: "asc" },
        { label: "Order Status", field: "orderStatus", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" }
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
