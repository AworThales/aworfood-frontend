import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate} from 'react-router-dom';
import LoadingSpinner from '../layout/LoadingSpinner';

const ProtectedRoute = ({ admin, children }) => {

    const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

    // Displaying a loader when this component is mount
    if (loading) return <LoadingSpinner />

    // restricting users that are not register to certain pages in the app
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // ensuring that only a user with admin role can access admin dashboard or page
    if (admin && user?.role !== 'admin') {
      return <Navigate to="/" replace />;
    }

    // apart from above condition other pages are not restricted
  return children;
}

export default ProtectedRoute
