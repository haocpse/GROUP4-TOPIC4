import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
const ViewDesign = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { design } = location.state;
    
    return (
        <div className="container mt-4">
            <h2 className="text-center" style={{ color: 'black' }}>Design Details</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Design ID: {design.designId}</h5>
                    <p className="card-text"><strong>Customer Name:</strong> {design.customerName}</p>
                    <p className="card-text"><strong>Description:</strong> {design.description}</p>
                    <p className="card-text"><strong>Status:</strong> {design.status}</p>

                    {/* Hiển thị 4 ảnh */}
                    <div className="row">
                        {design.imageUrls && design.imageUrls.map((imageUrl, index) => (
                            <div className="col-md-3 mb-3" key={index}>
                                <img
                                    src={imageUrl}  // Đường dẫn tới file ảnh
                                    alt={`Design Image ${index + 1}`}
                                    className="img-fluid" // Sử dụng Bootstrap class để responsive
                                    style={{ maxHeight: '200px', maxWidth: '100%' }} // Giới hạn kích thước
                                />
                            </div>
                        ))}
                    </div>

                    <button className="btn btn-secondary" onClick={() => navigate(-1)}>Go Back</button>
                </div>
            </div>
        </div>
    );
}
export default ViewDesign;
