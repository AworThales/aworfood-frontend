import React, { useEffect, useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import MetaData from '../layout/MetaData'
import toast from 'react-hot-toast';
import LoadingSpinner from '../layout/LoadingSpinner';
import { Link, useParams } from 'react-router-dom';
import { useOrderDetailsQuery, useUpdateOrderMutation } from '../../redux/api/orderApi';

const ProcessOrder = () => {
    const { id } = useParams();
    const [status, setStatus] = useState("");

    const { data, isLoading, error } = useOrderDetailsQuery(id);
    const order = data?.order || {};

    const [updateOrder, { error: updateError, isSuccess }] = useUpdateOrderMutation();

  
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      paymentMethod,
      orderStatus,
      totalAmount,
      itemsPrice,
      shippingAmount,
      taxAmount,
      createdAt,
      user,
      _id,
    } = order;

    useEffect(() => {
        if(orderStatus) {
            setStatus(orderStatus)
        }

    }, [orderStatus]);
  
    useEffect(() => {
        if(orderStatus) {
            setStatus(orderStatus)
        }

        if (error) {
            toast.error(error?.data?.message);
        }
        if (updateError) {
            toast.error(updateError?.data?.message);
        }

        if (isSuccess) {
            toast.success("Order upadted Successfully!");
        }
    }, [error, isSuccess, orderStatus, updateError]);

    const updateOrderHandler = (id) =>{
        const data = {status}
        updateOrder({id, body: data})
    }
  
    if (isLoading) return <LoadingSpinner />;

    
  return (
    <AdminLayout>
        <MetaData title={"Process Order"}/>
        <div className="row d-flex justify-content-around">
      <div className="col-12 col-lg-8 order-details">
        <h3 className="mt-5 mb-4">Order Details</h3>

        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">ID</th>
              <td>{order?._id}</td>
            </tr>
            <tr>
              <th scope="row">Order Status</th>
              <td  className={`badge ${orderStatus === "Delivered" ? "bg-success" : "bg-secondary"}`}>
                <b>{orderStatus}</b>
              </td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 mb-4">Shipping Info</h3>
        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">Name</th>
              <td>{user?.name}</td>
            </tr>
            <tr>
              <th scope="row">Phone No</th>
              <td>{shippingInfo?.phoneNo}</td>
            </tr>
            <tr>
              <th scope="row">Address</th>
              <td>{shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.zipCode}, {shippingInfo?.country}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 mb-4">Payment Info</h3>
        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">Status</th>
              <td className="greenColor">
                <b className={`badge ${paymentInfo?.status === "paid" ? "bg-success" : "bg-warning text-dark"}`}>
                  {paymentInfo?.status?.toUpperCase()}
                </b>
              </td>
            </tr>
            <tr>
              <th scope="row">Method</th>
              <td>{order?.paymentMethod}</td>
            </tr>
            <tr>
              <th scope="row">Stripe ID</th>
              <td>{paymentInfo?.id || "N/A"}</td>
            </tr>
            <tr>
              <th scope="row">Amount</th>
              <td>${totalAmount}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 my-4">Order Items:</h3>

        <hr />
        <div className="cart-item my-1">
        {orderItems?.map((item) => (
          <div className="row my-5">
            <div className="col-4 col-lg-2">
            <img src={item.image} alt={item.name} width="50" height="40" />
            </div>
            <div className="col-5 col-lg-5">
                <Link to={`/foods/${item.food}`} className="text-decoration-none">{item.name}</Link>
            </div>
            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
              <p>${Number(item.price).toFixed(2)}</p>
            </div>
            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
              <p>{item.quantity} Piece(s)</p>
            </div>
          </div>
          ))}
        </div>
        <hr />
      </div>

      <div className="col-12 col-lg-3 mt-5">
        <h4 className="my-4">Status</h4>

        <div className="mb-3">
          <select className="form-select" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        <button onClick={() => updateOrderHandler(order?._id)} className="btn btn-danger w-100">Update Status</button>

        <h4 className="mt-5 mb-3">Order Invoice</h4>
        <Link to={`/invoice/order/${order?._id}`} className="btn btn-success w-100">
          <i className="fa fa-print"></i> Generate Invoice
        </Link>
      </div>
    </div>

      
    </AdminLayout>
  )
}

export default ProcessOrder
