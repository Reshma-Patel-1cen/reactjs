import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from './common';

// handle the public routes
const PublicRoutes = () => {
  console.log("token", getToken())
  return !getToken() ? <Outlet /> : <Navigate to="/" />
}

export default PublicRoutes;