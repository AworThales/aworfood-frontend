import './App.css';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import userRoutes from './components/routes/userRoutes';
import adminRoutes from './components/routes/adminRoutes';
import NotFound from './components/layout/NotFound';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const useUserRoutes = userRoutes();
  const useAdminRoutes = adminRoutes();

  return (
    <div className="app-container">
      <Toaster position="top-center" />
      {!isAdminRoute && <Navbar />}

      <div className="container">
        <Routes>
          {useUserRoutes}
          {useAdminRoutes}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
