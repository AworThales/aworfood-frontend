import React from 'react'
import ProtectedRoute from '../auth/ProtectedRoute'
import { Route } from 'react-router-dom'
import Dashboard from '../admin/Dashboard'
import ListFoods from '../admin/ListFoods'
import CreateNewFood from '../admin/CreateNewFood'
import UpdateFood from '../admin/UpdateFood'
import UploadImages from '../admin/UploadImages'
import ListsOrders from '../admin/ListsOrders'
import ProcessOrder from '../admin/ProcessOrder'
import ListsUsers from '../admin/ListsUsers'
import UpdateUser from '../admin/UpdateUser'
import FoodReview from '../admin/FoodReview'

const adminRoutes = () => {
  return (
    <>
       <Route path='/admin/dashboard' element={
            <ProtectedRoute admin={true}>
                <Dashboard />
            </ProtectedRoute>
        } />
       <Route path='/admin/food/create' element={
            <ProtectedRoute admin={true}>
                <CreateNewFood />
            </ProtectedRoute>
        } />

       <Route path='/admin/foods' element={
            <ProtectedRoute admin={true}>
                <ListFoods />
            </ProtectedRoute>
        } />

       <Route path='/admin/foods/:id' element={
            <ProtectedRoute admin={true}>
                <UpdateFood />
            </ProtectedRoute>
        } />

       <Route path='/admin/foods/:id/upload_images' element={
            <ProtectedRoute admin={true}>
                <UploadImages />
            </ProtectedRoute>
        } />
       <Route path='/admin/orders' element={
            <ProtectedRoute admin={true}>
                <ListsOrders />
            </ProtectedRoute>
        } />
       <Route path='/admin/orders/:id' element={
            <ProtectedRoute admin={true}>
                <ProcessOrder />
            </ProtectedRoute>
        } />
       <Route path='/admin/users' element={
            <ProtectedRoute admin={true}>
                <ListsUsers />
            </ProtectedRoute>
        } />
       <Route path='/admin/users/:id' element={
            <ProtectedRoute admin={true}>
                <UpdateUser />
            </ProtectedRoute>
        } />

       <Route path='/admin/reviews' element={
            <ProtectedRoute admin={true}>
                <FoodReview />
            </ProtectedRoute>
        } />

    </>
  )
}

export default adminRoutes
