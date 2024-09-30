import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import Contact from './Components/Contact/Contact';
import Service from './Components/Service/Service';
import MainLayout from './Components/MainLayout';
import Construction from './Components/Construction/Construction';
import Design from './Components/Design/Design';
import Consultation from './Components/Consultation/Consultation';
import QuotationOrder from './Components/QuotationOrder/QuotationOrder';
import QuotationPage from './Components/QuotationOrder/QuotationPage';

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
      path: "sidebar",
      element: < MainLayout />,
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
        {
          path: 'QuotationOrder',
          element: <QuotationOrder />,
        },
        {
          path: 'quotation',
          element: <App/>
        }
      ]
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
