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
import ListQuotation from "./Components/ListQuotation/ListQuotation";
import ViewQuotationInConsultationPage from "./Components/ListQuotation/ViewQuotationInConsultationPage";
import ViewDesign from "./Components/ApproveDesign/ViewDesign";
import DesignerTasks from "./Components/DesignerTasks/DesignerTasks";
import CustomerView from "./Components/CustomerView/CustomerView";
import CustomerQuotationList from "./Components/CustomerView/CustomerQuotationList";
import ViewQuotationAfterCreate from "./Components/QuotationOrder/ViewQuotationAfterCreate";
import MainLayoutConsultant from "./Components/MainLayoutConsultant";
import Main from "./Components/Main/Main";
import Navbar from "./Components/Navbar/Navbar";
import ApproveMaintenanceQuotation from "./Components/ApproveQuotation/ApproveMaintenanceQuotation";
import ViewMaintenanceQuotation from "./Components/ApproveQuotation/ViewMaintenanceQuotation";
import MainLayoutDesigner from "./Components/MainLayoutDesigner";
import Package from "./Components/Package/PackageManage";
import PackagePrice from "./Components/Package/PackagePrice";
import PackageConstruction from "./Components/Package/PackageConstruction";
import PaymentMethods from "./Components/ListQuotation/PaymentMethod";
import PaymentPageCard from "./Components/ListQuotation/PaymentPage-Card";
import PaymentPageQR from "./Components/ListQuotation/PaymentPage_QR";
import PaymentInfo from "./Components/ListQuotation/PaymentInfo";
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

    // MANAGER
    {
      path: "manage",
      element: <MainLayout />,
      children: [
        {
          path: "request",
          element: <Request />,
        },
        {
          path: "quotations",
          element: <ApproveQuotation />,
        },
        {
          path: "quotations/:id",
          element: <ViewQuotation />,
        },
        {
          path: "Maintenance-quotations",
          element: <ApproveMaintenanceQuotation />,
        },
        {
          path: "Maintenance-quotations/:id",
          element: <ViewMaintenanceQuotation />,
        },

        {
          path: "designs",
          element: <ApproveDesign />,
        },
       
        {
          path: "designs/:id",
          element: <ViewDesign />,
        },
       
      ],
    },


    // CONSULTANT
    {
      path: "consult",
      element: <MainLayoutConsultant />,
      children: [
        {
          path: "ownedTasks",
          element: <ConsultantTasks />,
        },
        {
          path: "ownedTasks/:constructionOrderId",
          element: <QuotationOrder />,
        },
        {
          path: "ownedTasks/:constructionOrderId/quotation",
          element: <ViewQuotationAfterCreate />,
        },
        {
          path: "list-quotation",
          element: <ListQuotation />,
        },
        {
          path: "view-Quotation",
          element: <ViewQuotationInConsultationPage />,
        },
      ],
    },




     // DESIGN
     {
      path: "design",
      element: <MainLayoutDesigner />,
      children: [
        {
          path: "ownedTasks",
          element: <DesignerTasks />,
        },
        {
          path: "ownedTasks/:constructionOrderId",
          element: <DesignUpload />,
        },   
       
      ],
    },





    // CONSTRUCTOR

    {
      path: "construct/ownedTasks",
      element: <ConstructionOrder />,
    },
    {
      path: "construct/ownedTasks/:constructionOrderId",
      element: <ConstructionProgress />,
    },


    // {
    //   path: "view-payment", // Sửa path này thành list-quotation thay vì 'list quotation'
    //   element: <ViewPayment />,
    // },
    {
      path: "list-quotation", // Sửa path này thành list-quotation thay vì 'list quotation'
      element: <ListQuotation />,
    },
    {
      path: "view-Quotation", // Sửa path này thành list-quotation thay vì 'list quotation'
      element: <ViewQuotationInConsultationPage />,
    },
    {
      path: "payment-method", // Sửa path này thành list-quotation thay vì 'list quotation'
      element: <PaymentMethods/>,
    },
    {
      path:"payment-Card",
      element: <PaymentPageCard/>
    },
    {
      path:"payment-Info",
      element : <PaymentInfo />
    },
    {
      path: "payment-QR",
      element :<PaymentPageQR />
    },


    // CUSTOMER
    {
      path: "myInfo/orders",
      element: <CustomerQuotationList />,
    },
    {
      path: "customer-view",
      element: <CustomerView />,
    },


    {
      path: "navbar", // Add the route for DesignUpload
      element: <Navbar />,
    },
    {
      path: "package",
      element: <Package />, // Route cho Package
      children: [
        {
          path: "package-price", // Route cho Package Price
          element: <PackagePrice />,
        },
        {
          path: "package-construction", // Route cho Package Construction
          element: <PackageConstruction />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
export default App;
