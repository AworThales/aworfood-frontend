import React, { useEffect, useState } from 'react';
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { caluclateOrderCost } from '../../helpers/helpers';
import { useCreateNewOrderMutation, useStripeCheckoutSessionMutation } from '../../redux/api/orderApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PaymentMethod = () => {
  const [method, setMethod] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const [createNewOrder, { error, isSuccess }] = useCreateNewOrderMutation();
  const [stripeCheckoutSession, { data: checkoutData, isLoading, error: checkoutError }] = useStripeCheckoutSessionMutation();


  const { itemsPrice, shippingPrice, taxPrice, totalPrice } = caluclateOrderCost(cartItems);

  useEffect(() =>{
    if (checkoutData) {
        // console.log(checkoutData)
        window.location.href = checkoutData?.url;
    }

    if (checkoutError) {
        toast.error(checkoutError?.data?.message);
      }
  
  },[checkoutData, navigate, checkoutError, dispatch])


  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      navigate("/me/orders?order_success=true");
    }
  }, [error, isSuccess, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!method) {
      toast.error('Please select a payment method');
      return;
    }

    if (method === 'COD') {
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
        paymentInfo: { status: 'Not Paid' },
        paymentMethod: 'COD',
      };

      createNewOrder(orderData);
    }

    if (method === 'Card') {
      // Stripe integration placeholder
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
      };

      stripeCheckoutSession(orderData)
    }
  };

  return (
    <>
      <MetaData title={'Payment Method'} />
      <CheckoutSteps shipping confirmOrder payment />

      <div className="container my-5 d-flex justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <form
            className="p-4 p-md-5 shadow-lg rounded bg-white"
            onSubmit={submitHandler}
          >
            <h3 className="text-center text-danger mb-4 fw-bold">
              Choose Payment Method
            </h3>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="codradio"
                value="COD"
                onChange={(e) => setMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="codradio">
                <i className="fas fa-truck me-2"></i> Cash on Delivery
              </label>
            </div>

            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="cardradio"
                value="Card"
                onChange={(e) => setMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="cardradio">
                <i className="fas fa-credit-card me-2"></i> Pay with Card (VISA, MasterCard)
              </label>
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-danger w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
