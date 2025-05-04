import React, { useState } from 'react';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeCartItem, setCartItem } from '../../redux/features/cartSlice';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const increaseQty = (item, quantity) => {
    const newQty = quantity + 1;
    if (newQty > item?.stock) return;
    setCartToItem(item, newQty);
  };

  const decreaseQty = (item, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    setCartToItem(item, newQty);
  };

  const setCartToItem = (item, newQty) => {
    const cartItem = {
      food: item?.food,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      stock: item?.stock,
      quantity: newQty,
    };
    dispatch(setCartItem(cartItem));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeCartItem(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  }

  return (
    <>
      <MetaData title="Your Cart" />

      <div className="container py-5">
        {cartItems?.length === 0 ? (
          <div className="text-center mt-5">
            <h2 className="text-secondary">Your Cart is Empty 😔</h2>
            <Link to="/" className="btn btn-outline-primary mt-4">Go Back to Shop</Link>
          </div>
        ) : (
          <>
            <h2 className="mb-4 text-center text-md-start">Your Cart <b>({cartItems.length} items)</b></h2>
            <div className="row gy-4">
              <div className="col-lg-8">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="card shadow-sm mb-3 p-3 border-0">
                    <div className="row align-items-center">
                      <div className="col-4 col-md-3 text-center">
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="img-fluid rounded"
                          style={{ maxHeight: '100px', objectFit: 'cover' }}
                        />
                      </div>

                      <div className="col-8 col-md-3">
                        <Link to={`/food/${item?.food}`} className="text-decoration-none fw-semibold">
                          {item?.name}
                        </Link>
                        <p className="text-muted small mt-1">In stock: {item?.stock}</p>
                      </div>

                      <div className="col-12 col-md-2 mt-3 mt-md-0 text-md-center">
                        <p className="fw-semibold mb-0">${item?.price}</p>
                      </div>

                      <div className="col-12 col-md-3 mt-3 mt-md-0 d-flex align-items-center justify-content-md-center">
                        <div className="d-flex align-items-center w-100 justify-content-between">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => decreaseQty(item, item?.quantity)}
                          >−</button>

                          <input
                            type="number"
                            className="form-control form-control-sm text-center mx-2"
                            style={{ maxWidth: '60px' }}
                            value={item?.quantity}
                            readOnly
                          />

                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => increaseQty(item, item?.quantity)}
                          >+</button>
                        </div>
                      </div>

                      <div className="col-12 col-md-1 text-end mt-3 mt-md-0">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeCartItemHandler(item?.food)}
                          title="Remove Item"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-lg-4">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">Order Summary</h5>
                    <hr />
                    <p className="mb-2">
                      Total Items:{" "}
                      <span className="float-end fw-medium">
                        {cartItems.reduce((acc, item) => acc + item?.quantity, 0)} Units
                      </span>
                    </p>
                    <p className="mb-3">
                      Estimated Total:{" "}
                      <span className="float-end fw-semibold">
                        ${cartItems.reduce((acc, item) => acc + item?.price * item?.quantity, 0).toFixed(2)}
                      </span>
                    </p>
                    <hr />
                    <button className="btn btn-danger w-100" onClick={checkoutHandler}>Proceed to Checkout</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
