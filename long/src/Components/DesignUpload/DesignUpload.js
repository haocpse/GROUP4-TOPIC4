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

import React, { useEffect, useState } from "react";
import "./DesignUpload.css"; // Import CSS file for styling

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

  // Mock data
  const mockCustomerInfo = {
    customerName: "Nguyễn Văn A",
    phone: "0901234567",
    address: "123 Đường ABC, Quận 1, TP.HCM",
  };

  const mockImages = {
    image2D: "https://example.com/image2d.jpg", // Mock image URL
    image3D: "https://example.com/image3d.jpg", // Mock image URL
    frontView: "https://example.com/frontview.jpg", // Mock image URL
    rearView: "https://example.com/rearview.jpg", // Mock image URL
  };

  useEffect(() => {
    // Set mock data on component mount
    setCustomerInfo(mockCustomerInfo);
    setImages(mockImages);
  }, []);

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
    <div className="design-upload">
      <h1>Upload Design Images</h1>

      <form onSubmit={handleSubmit}>
        <div className="customer-info">
          <h2>Customer Information</h2>
          <div className="input-group">
            <input
              type="text"
              name="customerName"
              placeholder="Name"
              value={customerInfo.customerName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={customerInfo.phone}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={customerInfo.address}
              onChange={handleInputChange}
              required
            />
          </div>
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
            {images.image2D && (
              <img src={images.image2D} alt="2D" width="100" />
            )}
          </div>
          <div className="upload-box">
            <label>3D Image:</label>
            <input
              type="file"
              name="image3D"
              accept="image/*"
              onChange={handleImageChange}
            />
            {images.image3D && (
              <img src={images.image3D} alt="3D" width="100" />
            )}
          </div>
          <div className="upload-box">
            <label>Front View:</label>
            <input
              type="file"
              name="frontView"
              accept="image/*"
              onChange={handleImageChange}
            />
            {images.frontView && (
              <img src={images.frontView} alt="Front View" width="100" />
            )}
          </div>
          <div className="upload-box">
            <label>Rear View:</label>
            <input
              type="file"
              name="rearView"
              accept="image/*"
              onChange={handleImageChange}
            />
            {images.rearView && (
              <img src={images.rearView} alt="Rear View" width="100" />
            )}
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DesignUpload;
