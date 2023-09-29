import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Entry from './components/pages/Entry';
import Home from './components/pages/Home';
import ErrorPage from './components/pages/Error';
import { tokenLoader } from './util/auth';


const router = createBrowserRouter([
  { 
    path: '/', 
    element: <Home />, 
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader
  },
  { 
    path: '/home', 
    element: <Home />, 
    errorElement: <ErrorPage />,
    id: 'home',
    loader: tokenLoader
  },
  { 
    path: '/auth', 
    element: <Entry />,
    id: 'auth',
    loader: tokenLoader
  }
]);

function App() {
  
  return <RouterProvider router={router} />;
}

export default App;
