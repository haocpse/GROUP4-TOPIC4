// // Components/DesignUpload/DesignUpload.js

// import React, { useState } from "react";
// import "./DesignUpload.css"; // Import CSS file for styling

// const DesignUpload = () => {
//   const [customerInfo, setCustomerInfo] = useState({
//     customerName: "",
//     phone: "",
//     address: "",
//   });

//   const [images, setImages] = useState({
//     image2D: null,
//     image3D: null,
//     frontView: null,
//     rearView: null,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCustomerInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const { name, files } = e.target;
//     setImages((prev) => ({ ...prev, [name]: files[0] }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you would handle the upload of images and customer info
//     console.log("Customer Info:", customerInfo);
//     console.log("Images:", images);
//   };

//   return (
//     <div className="design-upload">
//       <h1>Upload Design Images</h1>
//       <div className="customer-info">
//         <h2>Customer Information</h2>
//         <p>Name: {customerInfo.customerName}</p>
//         <p>Phone: {customerInfo.phone}</p>
//         <p>Address: {customerInfo.address}</p>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="input-group">
//           <label>
//             Customer Name:
//             <input
//               type="text"
//               name="customerName"
//               value={customerInfo.customerName}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//           <label>
//             Phone:
//             <input
//               type="text"
//               name="phone"
//               value={customerInfo.phone}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//           <label>
//             Address:
//             <input
//               type="text"
//               name="address"
//               value={customerInfo.address}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//         </div>

//         <h2>Upload Images</h2>
//         <div className="upload-container">
//           <div className="upload-box">
//             <label>2D Image:</label>
//             <input
//               type="file"
//               name="image2D"
//               accept="image/*"
//               onChange={handleImageChange}
//             />
//           </div>
//           <div className="upload-box">
//             <label>3D Image:</label>
//             <input
//               type="file"
//               name="image3D"
//               accept="image/*"
//               onChange={handleImageChange}
//             />
//           </div>
//           <div className="upload-box">
//             <label>Front View:</label>
//             <input
//               type="file"
//               name="frontView"
//               accept="image/*"
//               onChange={handleImageChange}
//             />
//           </div>
//           <div className="upload-box">
//             <label>Rear View:</label>
//             <input
//               type="file"
//               name="rearView"
//               accept="image/*"
//               onChange={handleImageChange}
//             />
//           </div>
//         </div>

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default DesignUpload;
// Components/DesignUpload/DesignUpload.js

import React, { useState } from "react";
import "./DesignUpload.css"; // Import CSS file for styling
import Navbar from "../Navbar/Navbar";

const DesignUpload = () => {
  const [customerInfo, setCustomerInfo] = useState({
    customerName: "",
    phone: "",
    address: "",
  });

  const [images, setImages] = useState({
    image2D: null,
    image3D: null,
    frontView: null,
    rearView: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setImages((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the upload of images and customer info
    console.log("Customer Info:", customerInfo);
    console.log("Images:", images);
  };

  return (
    <>
      |<Navbar />
      <div className="design-upload mt-4">
        <h1>Upload Design Images</h1>
        <div className="customer-info">
          <h2>Customer Information</h2>
          <p>Name: {customerInfo.customerName}</p>
          <p>Phone: {customerInfo.phone}</p>
          <p>Address: {customerInfo.address}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>
              Customer Name:
              <input
                type="text"
                name="customerName"
                value={customerInfo.customerName}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={customerInfo.phone}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={customerInfo.address}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>

          <h2>Upload Images</h2>
          <div className="upload-container">
            <div className="upload-box">
              <label>2D Image:</label>
              <input
                type="file"
                name="image2D"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="upload-box">
              <label>3D Image:</label>
              <input
                type="file"
                name="image3D"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="upload-box">
              <label>Front View:</label>
              <input
                type="file"
                name="frontView"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="upload-box">
              <label>Rear View:</label>
              <input
                type="file"
                name="rearView"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );

};

export default DesignUpload;

