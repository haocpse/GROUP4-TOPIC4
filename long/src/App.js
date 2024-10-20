import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import ViewDesign from "./Components/ApproveDesign/ViewDesign";
import DesignerTasks from "./Components/DesignerTasks/DesignerTasks";
import CustomerView from "./Components/CustomerView/CustomerView";
import CustomerQuotationList from "./Components/CustomerView/CustomerQuotationList";
import ViewQuotationAfterCreate from "./Components/QuotationOrder/ViewQuotationAfterCreate";
import MainLayoutConsultant from "./Components/MainLayoutConsultant";
import Main from "./Components/Main/Main";
import ApproveMaintenanceQuotation from "./Components/ApproveQuotation/ApproveMaintenanceQuotation";
import ViewMaintenanceQuotation from "./Components/ApproveQuotation/ViewMaintenanceQuotation";
import MainLayoutDesigner from "./Components/MainLayoutDesigner";
import ProtectedRoutesManager from "./utils/ProtectedRoutesManager"
import ProtectedRoutesConsultant from "./utils/ProtectedRoutesConsultant"
import ProtectedRoutesDesigner from "./utils/ProtectedRoutesDesigner"
import ProtectedRoutesConstructor from "./utils/ProtectedRoutesConstructor"
import ConsultantQuotations from "./Components/ConsultantTasks/ConsultantQuotations";
import UpdateQuotation from "./Components/QuotationOrder/UpdateQuotation";
import ListDesign from "./Components/DesignerTasks/ListDesign";
import UpdateDesign from "./Components/DesignUpload/UpdateDesign";
import CustomerViewDesign from "./Components/CustomerView/CustomerViewDesign"
import PaymentInfo from "./Components/ListQuotation/PaymentInfo";
import MainLayoutConstructor from "./Components/MainLayoutConstructor";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoutesManager />}>
          <Route path="/manage" element={<MainLayout />}>
            <Route path="request" element={<Request />} />
            <Route path="quotations" element={<ApproveQuotation />} />
            <Route path="quotations/:id" element={<ViewQuotation />} />
            <Route path="Maintenance-quotations" element={<ApproveMaintenanceQuotation />} />
            <Route path="Maintenance-quotations/:id" element={<ViewMaintenanceQuotation />} />
            <Route path="designs" element={<ApproveDesign />} />
            <Route path="designs/:id" element={<ViewDesign />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoutesConsultant />}>
          <Route path="/consult" element={<MainLayoutConsultant />}>
            <Route path="ownedTasks" element={<ConsultantTasks />} />
            <Route path="quotations" element={<ConsultantQuotations />} />
            <Route path="ownedTasks/:constructionOrderId" element={<QuotationOrder />} />
            <Route path="ownedTasks/:constructionOrderId/quotation" element={<ViewQuotationAfterCreate />} />
            <Route path="quotations/:quotationId" element={<UpdateQuotation />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoutesDesigner />}>
          <Route path="/design" element={<MainLayoutDesigner />}>
            <Route path="ownedTasks" element={<DesignerTasks />} />
            <Route path="ownedTasks/:constructionOrderId" element={<DesignUpload />} />
            <Route path="designs" element={<ListDesign />} />
            <Route path="designs/:designId" element={<UpdateDesign />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoutesConstructor />}>
          <Route path="/construct" element={<MainLayoutConstructor />}>
            <Route path="ownedTasks" element={<ConstructionOrder />} />
            <Route path="ownedTasks/:constructionOrderId" element={<ConstructionProgress />} />
          </Route>
        </Route>
        <Route path="/myInfo/orders" element={<CustomerView />} />
        <Route path="/myInfo/orders/:constructionOrderId/quotation" element={<CustomerQuotationList />} />
        <Route path="/myInfo/orders/:constructionOrderId/design" element={<CustomerViewDesign />} />
        <Route path="/myInfo/orders/:constructionOrderId/payments" element={<PaymentInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
export default App;
