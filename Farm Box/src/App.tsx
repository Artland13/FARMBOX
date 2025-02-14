import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthentificated } from '@store/reducers/UserSlice';
import { useCheckUserQuery } from '@store/reducers/userApiSlice';

const Main = lazy(() => import('@pages/Main'));
const SignIn = lazy(() => import('@pages/SignIn'));
const SignUp = lazy(() => import('@pages/SignUp'));
const Orders = lazy(() => import('@pages/Orders'));
const Product = lazy(() => import('@pages/Product'));
const Layout = lazy(() => import('@pages/Layout/Layout'));
const ProtectedRoute = lazy(() => import('./hoc/ProtectedRoute'));

function App() {
  const { isLoading } = useCheckUserQuery();
  const isAuthenticated = useSelector(selectIsAuthentificated);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              <Layout>
                <Main />
              </Layout>
            }
          />
          <Route
            path="/orders"
            element={
              <Layout>
                <Orders />
              </Layout>
            }
          />
          <Route
            path="/product/:id"
            element={
              <Layout>
                <Product />
              </Layout>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} to="/signin">
                <Layout>
                  <Main />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="/error" element={<p>больше не существует</p>} />
          <Route path="*" element={<Navigate to="/error" replace />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
