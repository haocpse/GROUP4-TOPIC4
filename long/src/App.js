import './App.css';
import { createBrowserRouter, Navigate, Route, Router, RouterProvider, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import Contact from './Components/Contact/Contact';
import Service from './Components/Service/Service';
import MainLayout from './Components/MainLayout';
import Construction from './Components/Construction/Construction';
import Design from './Components/Design/Design';
import Consultation from './Components/Consultation/Consultation';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <SignUp />,
    },
    {
      path: "contact",
      element: <Contact />,
    },
    {
      path: "service",
      element: <Service />,
    },
    {
      path: "manage",
      element: <MainLayout />,
      children: [
        {
          path: 'consultation',
          element: <Consultation />,
        },
        {
          path: 'design',
          element: <Design />,
        },
        {
          path: 'construction',
          element: <Construction />,
        },
      ]
    },
    {
      path: "design",
      element: <Contact />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
