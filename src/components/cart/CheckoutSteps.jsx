import React from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'

const CheckoutSteps = ({shipping, confirmOrder, payment }) => {
  return (
    <>
        <MetaData title="Checkout" />
        <div className="checkout-progress d-flex justify-content-center mt-5 row">
        {/* shipping active */}
        {shipping ? (
            <Link
                to="/shipping"
                className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
            >
                <div className="triangle2-active"></div>
                <div className="step active-step">Shipping</div>
                <div className="triangle-active"></div>
            </Link>

        ) : (
            // {/* Shipping inactive */}
            <Link
                to="#!"
                className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
                disabled
            >
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Shipping</div>
                <div className="triangle-incomplete"></div>
            </Link>
        )}

        {/* confirm order section */}
        {confirmOrder ? (
            // {/* confirm order active */}
            <Link
                to="/confirm_order"
                className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
            >
                <div className="triangle2-active"></div>
                <div className="step active-step">Confirm Order</div>
                <div className="triangle-active"></div>
            </Link>
            
        ) : (

            // {/* confirm order inactive */}
            <Link
                to="#!"
                className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
                disabled
            >
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Confirm Order</div>
                <div className="triangle-incomplete"></div>
            </Link>
        )}

        {/* payment section */}
        {payment ? (
            // {/* payment active */}
            <Link
                to="/payment_method"
                className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
            >
                <div className="triangle2-active"></div>
                <div className="step active-step">Payment</div>
                <div className="triangle-active"></div>
            </Link>
        ) : (
                // {/* payment inactive */}
            <Link
                to="#!"
                className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
                disabled
            >
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Payment</div>
                <div className="triangle-incomplete"></div>
            </Link>
        )}
    </div>
    </>
  )
}

export default CheckoutSteps
