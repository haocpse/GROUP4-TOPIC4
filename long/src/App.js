import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Không cần import Route ở đây
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Contact from "./Components/Contact/Contact";
import Service from "./Components/Service/Service";
import MainLayout from "./Components/MainLayout";
import Construction from "./Components/Construction/Construction";
import ApproveDesign from "./Components/ApproveDesign/ApproveDesign";
import ConstructionProgress from "./Components/ConstructionProgress/ConstructionProgress";
import ConsultantTasks from "./Components/ConsultantTasks/ConsultantTasks";
import DesignUpload from "./Components/DesignUpload/DesignUpload";
import ConstructionOrder from "./Components/ConstructionProgress/ConstructionOrder";
import QuotationOrder from "./Components/QuotationOrder/QuotationOrder";
import QuotationPage from "./Components/QuotationOrder/QuotationPage";
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
          path: "approve-design",
          element: <ApproveDesign />,
        },
        {
          path: "approve-quotation",
          element: <ApproveQuotation />,
        },
        {
          path: "approve-design",
          element: <ApproveDesign/>
        },
        {
          path:"view-design",
          element:<ViewDesign/>
        },
        {
          path: "view-quotation",
          element: <ViewQuotation />,
        },
      ],
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
      path:"customer-quotation",
      element: <CustomerQuotationList />,
    },
    {
      path: "customer-view", // Add a route for CustomerView
      element: <CustomerView />,
    },

    {
      path: "designer-tasks", // Route cho Customer
      element: <DesignerTasks />,
    },
    {
      path: "designer-tasks/design-upload", // Add the route for DesignUpload
      element: <DesignUpload />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
