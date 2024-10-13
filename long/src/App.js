import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Không cần import Route ở đây
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Contact from "./Components/Contact/Contact";
import Service from "./Components/Service/Service";
import MainLayout from "./Components/MainLayout";
import ApproveDesign from "./Components/ApproveDesign/ApproveDesign";
import Request from "./Components/Request/Request";
import ConstructionProgress from "./Components/ConstructionProgress/ConstructionProgress";
import ConsultantTasks from "./Components/ConsultantTasks/ConsultantTasks";
import DesignUpload from "./Components/DesignUpload/DesignUpload";
import ConstructionOrder from "./Components/ConstructionProgress/ConstructionOrder";
import QuotationOrder from "./Components/QuotationOrder/QuotationOrder";
import ApproveQuotation from "./Components/ApproveQuotation/ApproveQuatation";
import ViewQuotation from "./Components/ApproveQuotation/ViewQuotation";
import ConsultationPage from "./Components/ConsultationPage/ConsultationPage";
import ListQuotation from "./Components/ListQuotation/ListQuotation";
import ViewQuotationInConsultationPage from "./Components/ListQuotation/ViewQuotationInConsultationPage";
import ViewDesign from "./Components/ApproveDesign/ViewDesign";
import ViewPayment from "./Components/ListQuotation/ViewPayment";
import DesignerTasks from "./Components/DesignerTasks/DesignerTasks";
import CustomerView from "./Components/CustomerView/CustomerView";
import CustomerQuotationList from "./Components/CustomerView/CustomerQuotationList";
import ViewQuotationAfterCreate from "./Components/QuotationOrder/ViewQuotationAfterCreate";
import Main from "./Components/Main/Main";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
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
          path: "request",
          element: <Request />,
        },
        {
          path: "designs",
          element: <ApproveDesign />,
        },
        {
          path: "quotations",
          element: <ApproveQuotation />,
        },
        {
          path: "designs/:id",
          element: <ViewDesign />,
        },
        {
          path: "quotations/:id",
          element: <ViewQuotation />,
        },
      ],
    },

    {
      path: "construct/ownedTasks",
      element: <ConstructionOrder />,
    },
    {
      path: "construct/ownedTasks/:constructionOrderId",
      element: <ConstructionProgress />,
    },

    {
      path: "consultation-page", // Sửa lại path thành chữ thường để thống nhất
      element: <ConsultationPage />,
    },

    {
      path: "consult/ownedTasks",
      element: <ConsultantTasks />,
    },
    {
      path: "list-quotation", // Sửa path này thành list-quotation thay vì 'list quotation'
      element: <ListQuotation />,
    },
    {
      path: "view-Quotation", // Sửa path này thành list-quotation thay vì 'list quotation'
      element: <ViewQuotationInConsultationPage />,
    },
    {
      path: "view-payment", // Sửa path này thành list-quotation thay vì 'list quotation'
      element: <ViewPayment />,
    },
    {
      path: "consult/ownedTasks/:constructionOrderId",
      element: <QuotationOrder />,
    },
    {
      path: "consult/ownedTasks/:constructionOrderId/quotation",
      element: <ViewQuotationAfterCreate />,
    },
    {
      path: "customrer-quotation",
      element: <CustomerQuotationList />,
    },
    {
      path: "customer-view",
      element: <CustomerView />,
    },

    {
      path: "design/ownedTasks",
      element: <DesignerTasks />,
    },
    {
      path: "design/ownedTasks/:constructionOrderId", // Add the route for DesignUpload
      element: <DesignUpload />,
    },
  ]);


  return <RouterProvider router={router} />;
}
export default App;
