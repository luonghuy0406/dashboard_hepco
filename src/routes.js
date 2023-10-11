import { Navigate, useRoutes, useLocation, Route,  } from 'react-router-dom'; 
import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
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
import axios from 'axios';
import { checkTokenExpiration } from './api';

// Protected route component that redirects to login if not authenticated
const PrivateRoute = ({ element, ...rest }) => {
  const token = sessionStorage.getItem('token');
  if(!token || checkTokenExpiration(token)){
    return <Navigate to="/login" replace />;
  }
  return element;
  
};

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <PrivateRoute element={<DashboardAppPage />} /> },
        { path: 'user', element: <PrivateRoute element={<UserPage />} /> },
        { path: 'products', element: <PrivateRoute element={<ProductsPage />} /> },
        { path: 'news', element: <PrivateRoute element={<BlogPage />} /> },
        { path: 'news/:id', element: <PrivateRoute element={<EditPost />} /> },
        { path: 'news/add', element: <PrivateRoute element={<AddNewPost />} /> },
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