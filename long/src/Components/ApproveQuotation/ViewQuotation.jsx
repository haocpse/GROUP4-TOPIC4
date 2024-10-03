// import React from "react";
// import { useLocation } from "react-router-dom";

// const ViewQuotation = () => {
//     const location = useLocation();
//     const quote = location.state?.quote;

//     if (!quote) {
//         return <div>No quotation details available.</div>;
//     }

//     return (
//         <div className="container mt-4">
//             <h2 className="text-center" style={{ color: 'blue' }}>Quotation Details</h2>
//             <table className="table table-bordered mt-4">
//                 <thead>
//                     <tr>
//                         <th>Package Type</th>
//                         <th>Volume</th>
//                         <th>Price Stage 1</th>
//                         <th>Price Stage 2</th>
//                         <th>Price Stage 3</th>
//                         <th>Total Price</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>{quote.packageType}</td>
//                         <td>{quote.volume}</td>
//                         <td>{quote.priceStage1}</td>
//                         <td>{quote.priceStage2}</td>
//                         <td>{quote.priceStage3}</td>
//                         <td>{quote.totalPrice}</td>
//                     </tr>
//                 </tbody>
//             </table>
//             <h3>Content:</h3>
//             <ul>
//                 {quote.content.map((item, index) => (
//                     <li key={index}>{item}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ViewQuotation;

import React from "react";
import { useLocation } from "react-router-dom";

const ViewQuotation = () => {
    const location = useLocation();
    const quote = location.state?.quote;


    // Sử dụng dữ liệu mẫu nếu không có quote trong location.state
    const quoteToDisplay = quote ;

    return (
        <div className="container mt-4">
            <h2 className="text-center" style={{ color: 'blue' }}>Quotation Details</h2>
            <table className="table table-bordered mt-4">
                <thead>
                    <tr>
                        <th>Package Type</th>
                        <th>Volume(m³)</th>
                        <th>Price Stage 1 (VND)</th>
                        <th>Price Stage 2 (VND)</th>
                        <th>Price Stage 3 (VND)</th>
                        <th>Total Price (VND)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{quoteToDisplay.packageType}</td>
                        <td>{quoteToDisplay.volume}</td>
                        <td>{quoteToDisplay.priceStage1}</td>
                        <td>{quoteToDisplay.priceStage2}</td>
                        <td>{quoteToDisplay.priceStage3}</td>
                        <td>{quoteToDisplay.totalPrice}</td>
                    </tr>
                </tbody>
            </table>
            <h3>Content:</h3>
            <ul>
                {quoteToDisplay.content.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default ViewQuotation;

