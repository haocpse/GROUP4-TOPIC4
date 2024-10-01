import "./App.css";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Contact from "./Components/Contact/Contact";
import Service from "./Components/Service/Service";
import MainLayout from "./Components/MainLayout";
import Construction from "./Components/Construction/Construction";
import Design from "./Components/Design/Design";
import Consultation from "./Components/Consultation/Consultation";
import ConstructionProgress from "./Components/ConstructionProgress/ConstructionProgress";
import ConsultantTasks from "./Components/ConsultantTasks/ConsultantTasks";
import DesignUpload from "./Components/DesignUpload/DesignUpload";
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
          path: "consultation",
          element: <Consultation />,
        },
        {
          path: "design",
          element: <Design />,
        },
        {
          path: "construction",
          element: <Construction />,
        },
      ],
    },
    {
      path: "construction-progress",
      element: <ConstructionProgress />,
    },
    {
      path: "consultant-tasks",
      element: <ConsultantTasks />,
    },
    {
      path: "design-upload", // Add the route for DesignUpload
      element: <DesignUpload />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
