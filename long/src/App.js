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
import ConstructionOrder from "./Components/ConstructionProgress/ConstructionOrder";
import ApproveQuotation from "./Components/ApproveQuotation/ApproveQuatation";
import ViewQuotation from "./Components/ApproveQuotation/ViewQuotation";

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
        {
          path: "approve-quotation",
          element: <ApproveQuotation />,
        },
        {
          path: "view-quotation",
          element: <ViewQuotation />,
        },
      ],
    },
    {
      path: "consultant-tasks",
      element: <ConsultantTasks />,
    },
    {
      path: "design-upload", // Add the route for DesignUpload
      element: <DesignUpload />,
    },
    {
      path: "construction-order",
      element: <ConstructionOrder />, // Trang hiển thị danh sách ConstructionOrderId
    },
    // Route cho ConstructionProgress hiển thị chi tiết dựa trên orderId
    {
      path: "construction-progress/:constructionOrderId", // Sử dụng orderId từ URL
      element: <ConstructionProgress />, // Trang hiển thị chi tiết task của constructionOrderId
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
