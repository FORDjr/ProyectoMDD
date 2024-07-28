import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Error404 from './pages/Error404';
import EditUser from './pages/EditUser';
import ProtectedRoute from './components/ProtectedRoute';
import Users from './pages/Users';
import Request from './pages/Request';
import Implement from './pages/Implement';
import React from 'react';
import ImplementCard from './components/implementcard';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/users" 
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <Users />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/edit-user/:rut" 
        element={
          <ProtectedRoute>
            <EditUser />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/request" 
        element={
          <ProtectedRoute>
            <Request />
          </ProtectedRoute>
        }
      />
      
      <Route 
        path="/implement" 
        element={
          <ProtectedRoute>
            <Implement />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<ImplementCard />} />
      <Route path="/request" element={<Request />} />

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AppRouter;
