import React, { useEffect } from 'react';
import MetaData from '../layout/MetaData';
import { useOrderDetailsQuery } from '../../redux/api/orderApi';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingSpinner from '../layout/LoadingSpinner';

const OrderDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useOrderDetailsQuery(id);
  const order = data?.order || {};

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
    paidAt,
    deliveredAt,
  } = order;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  const isPaid = (paymentMethod === "COD" && orderStatus === "Delivered") || paymentInfo?.status === "paid";

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <MetaData title={`Order #${_id}`} />
      <div className="container my-4" style={{ maxWidth: "900px" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold">
            <span style={{ color: '#e74c3c' }}>Awor</span><span style={{ color: '#000' }}>Food</span> Order Summary
          </h2>
          <small className="text-muted">Order placed on: {new Date(createdAt).toLocaleString()}</small>
        </div>

        <div className="border p-3 mb-4 rounded shadow-sm">
          <div className="d-flex justify-content-between">
            <h5 className="mb-3 fw-bold">Order ID: {_id}</h5>
            <a
              className="btn btn-sm btn-outline-success"
              href={`/invoice/order/${_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-print me-2"></i> Print Invoice
            </a>
          </div>

          <div className="row">
            {/* Shipping Info */}
            <div className="col-md-6 mb-3">
              <h6 className="fw-bold">Shipping Info</h6>
              <p className="mb-1"><strong>Name:</strong> {user?.name}</p>
              <p className="mb-1"><strong>Phone:</strong> {shippingInfo?.phoneNo}</p>
              <p className="mb-0"><strong>Address:</strong><br />
                {shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.zipCode}, {shippingInfo?.country}
              </p>
            </div>

            {/* Payment Info */}
            <div className="col-md-6 mb-3">
              <h6 className="fw-bold">Payment Info</h6>
              <p className="mb-1">
                <strong>Status:</strong>{" "}
                <span className={`badge ${isPaid ? "bg-success" : "bg-warning text-dark"}`}>
                  {isPaid ? "PAID" : "NOT PAID"}
                </span>
              </p>
              {isPaid && paidAt && (
                <p className="text-muted mb-1">
                  Paid on: {new Date(paidAt).toLocaleString()}
                </p>
              )}
              <p className="mb-1"><strong>Method:</strong> {paymentMethod}</p>
              <p className="mb-0"><strong>Stripe ID:</strong> {paymentInfo?.id || "N/A"}</p>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="mt-3">
            <h6 className="fw-bold">Delivery Status</h6>
            <p className="mb-1">
              <span className={`badge ${orderStatus === "Delivered" ? "bg-success" : "bg-secondary"}`}>
                {orderStatus}
              </span>
            </p>
            {orderStatus === "Delivered" && deliveredAt && (
              <p className="text-muted mb-0">
                Delivered on: {new Date(deliveredAt).toLocaleString()}
              </p>
            )}
          </div>
        </div>

        {/* Items Table */}
        <div className="border p-3 rounded shadow-sm mb-4">
          <h5 className="fw-bold mb-3">Order Items</h5>
          <table className="table table-bordered table-sm mb-0">
            <thead className="table-light">
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orderItems?.map((item) => (
                <tr key={item._id}>
                  <td><img src={item.image} alt={item.name} width="50" height="40" /></td>
                  <td>
                    <Link to={`/foods/${item.food}`} className="text-decoration-none">{item.name}</Link>
                  </td>
                  <td>${Number(item.price).toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="border p-3 rounded shadow-sm">
          <h5 className="fw-bold mb-3">Order Summary</h5>
          <table className="table table-borderless mb-0">
            <tbody>
              <tr>
                <td><strong>Items Price:</strong></td>
                <td>${itemsPrice?.toFixed(2)}</td>
              </tr>
              <tr>
                <td><strong>Tax:</strong></td>
                <td>${taxAmount?.toFixed(2)}</td>
              </tr>
              <tr>
                <td><strong>Shipping:</strong></td>
                <td>{shippingAmount > 0 ? `$${shippingAmount?.toFixed(2)}` : "Free"}</td>
              </tr>
              <tr className="border-top">
                <td><strong>Total:</strong></td>
                <td><strong>${totalAmount?.toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
