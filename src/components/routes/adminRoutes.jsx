import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';

import Dashboard from '../admin/Dashboard';
import ListFoods from '../admin/ListFoods';
import CreateNewFood from '../admin/CreateNewFood';
import UpdateFood from '../admin/UpdateFood';
import UploadImages from '../admin/UploadImages';
import ListsOrders from '../admin/ListsOrders';
import ProcessOrder from '../admin/ProcessOrder';
import ListsUsers from '../admin/ListsUsers';
import UpdateUser from '../admin/UpdateUser';
import FoodReview from '../admin/FoodReview';

const adminRoutes = () => [
  <Route
    path="/admin/dashboard"
    element={<ProtectedRoute admin={true}><Dashboard /></ProtectedRoute>}
    key="admin-dashboard"
  />,
  <Route
    path="/admin/food/create"
    element={<ProtectedRoute admin={true}><CreateNewFood /></ProtectedRoute>}
    key="create-food"
  />,
  <Route
    path="/admin/foods"
    element={<ProtectedRoute admin={true}><ListFoods /></ProtectedRoute>}
    key="list-foods"
  />,
  <Route
    path="/admin/foods/:id"
    element={<ProtectedRoute admin={true}><UpdateFood /></ProtectedRoute>}
    key="update-food"
  />,
  <Route
    path="/admin/foods/:id/upload_images"
    element={<ProtectedRoute admin={true}><UploadImages /></ProtectedRoute>}
    key="upload-images"
  />,
  <Route
    path="/admin/orders"
    element={<ProtectedRoute admin={true}><ListsOrders /></ProtectedRoute>}
    key="list-orders"
  />,
  <Route
    path="/admin/orders/:id"
    element={<ProtectedRoute admin={true}><ProcessOrder /></ProtectedRoute>}
    key="process-order"
  />,
  <Route
    path="/admin/users"
    element={<ProtectedRoute admin={true}><ListsUsers /></ProtectedRoute>}
    key="list-users"
  />,
  <Route
    path="/admin/users/:id"
    element={<ProtectedRoute admin={true}><UpdateUser /></ProtectedRoute>}
    key="update-user"
  />,
  <Route
    path="/admin/reviews"
    element={<ProtectedRoute admin={true}><FoodReview /></ProtectedRoute>}
    key="food-reviews"
  />,
];

export default adminRoutes;
