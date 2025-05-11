import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../Home';
import FoodDetaills from '../food/FoodDetaills';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Profile from '../user/Profile';
import UpdateProfile from '../user/UpdateProfile';
import ProtectedRoute from '../auth/ProtectedRoute';
import UploadAvatar from '../user/UploadAvatar';
import UpdatePassword from '../user/UpdatePassword';
import ForgotPassword from '../auth/ForgotPassword';
import ResetPassword from '../auth/ResetPassword';
import Cart from '../cart/Cart';
import Shipping from '../cart/Shipping';
import ConfirmOrder from '../cart/ConfirmOrder';
import PaymentMethod from '../cart/PaymentMethod';
import MyOrders from '../order/MyOrders';
import OrderDetails from '../order/OrderDetails';
import Invoce from '../invoice/Invoce';

const userRoutes = () => [
  <Route path="/" element={<Home />} key="home" />,
  <Route path="/food/:id" element={<FoodDetaills />} key="food-details" />,
  <Route path="/login" element={<Login />} key="login" />,
  <Route path="/register" element={<Register />} key="register" />,
  <Route path="/password/forgot" element={<ForgotPassword />} key="forgot-password" />,
  <Route path="/password/reset/:token" element={<ResetPassword />} key="reset-password" />,
  
  <Route path="/me/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} key="profile" />,
  <Route path="/me/update_profile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} key="update-profile" />,
  <Route path="/me/upload_avatar" element={<ProtectedRoute><UploadAvatar /></ProtectedRoute>} key="upload-avatar" />,
  <Route path="/me/update_password" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} key="update-password" />,

  <Route path="/cart" element={<Cart />} key="cart" />,
  <Route path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} key="shipping" />,
  <Route path="/confirm_order" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} key="confirm-order" />,
  <Route path="/payment_method" element={<ProtectedRoute><PaymentMethod /></ProtectedRoute>} key="payment-method" />,
  <Route path="/me/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} key="my-orders" />,
  <Route path="/me/order/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} key="order-details" />,
  <Route path="/invoice/order/:id" element={<ProtectedRoute><Invoce /></ProtectedRoute>} key="invoice" />,
];

export default userRoutes;
