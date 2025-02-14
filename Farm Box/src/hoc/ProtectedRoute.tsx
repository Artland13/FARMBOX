import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface IProtectedRoute {
  isAuthenticated: boolean;
  children: ReactNode;
  to: string;
}

const ProtectedRoute = ({ isAuthenticated=false, children, to }:IProtectedRoute) => {
  if (!isAuthenticated) {
    return <Navigate to={to} replace />;
  }
  return children;
};

export default ProtectedRoute;
