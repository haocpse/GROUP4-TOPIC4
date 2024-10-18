import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './QuotationOrder.module.css';

const ViewQuotationAfterCreate = () => {
  const { constructionOrderId } = useParams();
  const [infoquotation, setInfoQuotation] = useState({}); // Initialize as an object

  useEffect(() => {
    const fetchInfoQuotation = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/consult/ownedTasks/${constructionOrderId}/quotation`);
        setInfoQuotation(response.data.data);
      } catch (error) {
        console.error("Error fetching quotation data:", error);
      }
    };

    fetchInfoQuotation();
  }, [constructionOrderId]);

  return (
    <div className={`${styles.quotationOrderContainer} container mt-5`}>
      <div className="card shadow">
      <div className={`card-header text-center ${styles.bgRed} text-white`}>
           <h2 className="text-center">Quotation</h2>
           <div className="d-flex justify-content-between">
             <p><strong>Order ID:</strong> {constructionOrderId}</p>
             <p><strong>Consultant:</strong> {infoquotation.consultantName}</p>
           </div>
         </div>
        <div className="card-body">
          <div className="row mb-4 border p-3">
            <div className="col-md-6">
              <p><strong>Customer: </strong> {infoquotation.customerName}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Consultant: </strong> {infoquotation.consultantName}</p>
            </div>
            <div className="col-md-12">
              <p><strong>Request: </strong> {infoquotation.customerRequest}</p>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-6">
              <p className="font-weight-bold" style={{ fontSize: '1.5rem' }}>
                <strong>Volume:</strong> {infoquotation.volume} m³
              </p>
            </div>
            <div className="col-md-12">
              <p><strong>Price Stage 1:</strong> {infoquotation.priceStage1} VND</p>
            </div>
            <div className="col-md-12">
              <p><strong>Price Stage 2:</strong> {infoquotation.priceStage2} VND</p>
            </div>
            <div className="col-md-12">
              <p><strong>Price Stage 3:</strong> {infoquotation.priceStage3} VND</p>
            </div>
            <div className="col-md-12">
              <p className="font-weight-bold"><strong>Total Price:</strong> {infoquotation.totalPrice} VND</p>
            </div>
          </div>
          <div>
            <h3 className="mb-3">Construction contents:</h3>
            <p><strong>Package: </strong>{infoquotation.packageType}</p>
            {infoquotation.content && infoquotation.content.map((item, index) => (
              <div key={index} className="mb-2">
                <label>{item}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQuotationAfterCreate;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import styles from './QuotationOrder.module.css';

// // Mock data
// const mockQuotationData = {
//   data: {
//     customerName: "John Doe",
//     consultantName: "Jane Smith",
//     customerRequest: "Build a koi pond with a waterfall.",
//     volume: 30, // in cubic meters
//     packageType: "Standard Package",
//     priceStage1: 1000000, // in VND
//     priceStage2: 1500000, // in VND
//     priceStage3: 2000000, // in VND
//     totalPrice: 4500000, // in VND
//     content: [
//       "Excavate the area for the pond",
//       "Install the pond liner",
//       "Set up the waterfall",
//       "Add filtration system",
//       "Plant aquatic plants"
//     ]
//   }
// };

// const ViewQuotationAfterCreate = () => {
//   const { constructionOrderId } = useParams();
//   const [infoquotation, setInfoQuotation] = useState([]);

//   useEffect(() => {
//     // Instead of fetching from API, use mock data
//     setInfoQuotation(mockQuotationData.data);
//   }, []);

//   return (
//     <div className={`${styles.quotationOrderContainer} container mt-5`}>
//       <div className={`card shadow`}>
//         <div className={`card-header text-center ${styles.bgRed} text-white`}>
//           <h2 className="text-center">Quotation</h2>
//           <div className="d-flex justify-content-between">
//             <p><strong>Order ID:</strong> {constructionOrderId}</p>
//             <p><strong>Consultant:</strong> {infoquotation.consultantName}</p>
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="row mb-4 border p-3">
//             <div className="col-md-6">
//               <p><strong>Customer: </strong> {infoquotation.customerName}</p>
//             </div>
//             <div className="col-md-6">
//               <p><strong>Consultant: </strong> {infoquotation.consultantName}</p>
//             </div>
//             <div className="col-md-12">
//               <p><strong>Request: </strong> {infoquotation.customerRequest}</p>
//             </div>
//           </div>
//           <div className="row mb-4">
//             <div className="col-md-6">
//               <p className="font-weight-bold" style={{ fontSize: '1.5rem' }}>
//                 <strong>Volume:</strong> {infoquotation.volume} m³
//               </p>
//             </div>
//             <div className="col-md-12">
//               <p><strong>Price Stage 1:</strong> {infoquotation.priceStage1} VND</p>
//             </div>
//             <div className="col-md-12">
//               <p><strong>Price Stage 2:</strong> {infoquotation.priceStage2} VND</p>
//             </div>
//             <div className="col-md-12">
//               <p><strong>Price Stage 3:</strong> {infoquotation.priceStage3} VND</p>
//             </div>
//             <div className="col-md-12">
//               <p className="font-weight-bold"><strong>Total Price:</strong> {infoquotation.totalPrice} VND</p>
//             </div>
//           </div>
//           <div>
//             <h3 className="mb-3">Construction contents:</h3>
//             <p><strong>Package: </strong>{infoquotation.packageType}</p>
//             {infoquotation.content && infoquotation.content.map((item, index) => (
//               <div key={index} className="mb-2">
//                 <label>{item}</label>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewQuotationAfterCreate;
