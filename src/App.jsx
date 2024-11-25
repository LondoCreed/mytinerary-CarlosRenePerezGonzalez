import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/FirstLayout';
import Home from './pages/Home';
import Cities from './pages/Cities';
import CityDetail from './pages/CityDetail';
import ErrorPage from './pages/ErrorPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserDashboard from './components/UserDashboard';
import GoogleCallback from './components/GoogleCallBack';
import ProtectedRoute from './components/ProtectedRoute';
import AuthRoute from './components/AuthRoute';


const router = createBrowserRouter([
  {
    path: '/auth/google/callback',
    element: <GoogleCallback />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'cities',
        element: <Cities />,
      },
      {
        path: 'city/:id',
        element: <CityDetail />,
      },
      {
        path: 'signin',
        element: (
          <AuthRoute>
            <SignIn />
          </AuthRoute>
        ),
      },
      {
        path: 'signup',
        element: (
          <AuthRoute>
            <SignUp />
          </AuthRoute>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
