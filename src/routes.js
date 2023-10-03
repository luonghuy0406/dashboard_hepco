import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import EditPost from './pages/EditPost';
import AddNewPost from './pages/AddNewPost';
import setAuthToken from './setAuthToken';

// Protected route component that redirects to login if not authenticated
const ProtectedRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('token');
  let isAuthenticated = false
  if (token) {
    setAuthToken(token);
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }
  if (isAuthenticated) {
    return element;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default function Router() {
  

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <ProtectedRoute element={<DashboardAppPage />} /> },
        { path: 'user', element: <ProtectedRoute element={<UserPage />} /> },
        { path: 'products', element: <ProtectedRoute element={<ProductsPage />} /> },
        { path: 'news', element: <ProtectedRoute element={<BlogPage />} /> },
        { path: 'news/:id', element: <ProtectedRoute element={<EditPost />} /> },
        { path: 'news/add', element: <ProtectedRoute element={<AddNewPost />} /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}