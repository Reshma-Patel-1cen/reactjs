import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PublicRoutes from './utils/PublicRoutes';
import PrivateRoutes from './utils/PrivateRoutes';
import Login from './pages/Login';
import Dashboard from './layout/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;