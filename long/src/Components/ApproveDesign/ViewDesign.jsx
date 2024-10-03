import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ViewDesign = () => {
    const location = useLocation();
    const quote = location.state?.quote;

    const [designStatus, setDesignStatus] = useState({
        image2D: null,
        image3D: null,
        frontView: null,
        rearView: null,
    });

    const handleAcceptReject = (view, status) => {
        setDesignStatus((prevStatus) => ({
            ...prevStatus,
            [view]: status,
        }));
        toast.success(`${view} has been ${status ? "accepted" : "rejected"}!`);
    };

    return (
        <div className="container mt-4">
            <ToastContainer position="top-right" autoClose={5000} />
            <h2 className="text-center" style={{ color: 'blue' }}>Design Details for {quote.customerName}</h2>

            <div className="row mt-4">
                <div className="col-md-6">
                    <h5>Image 2D</h5>
                    <img src={quote.image2D} alt="2D Design" className="img-fluid" />
                    <button 
                        className="btn btn-success me-2 mt-2"
                        onClick={() => handleAcceptReject("image2D", true)}
                    >
                        Accept
                    </button>
                    <button 
                        className="btn btn-danger mt-2"
                        onClick={() => handleAcceptReject("image2D", false)}
                    >
                        Reject
                    </button>
                </div>

                <div className="col-md-6">
                    <h5>Image 3D</h5>
                    <img src={quote.image3D} alt="3D Design" className="img-fluid" />
                    <button 
                        className="btn btn-success me-2 mt-2"
                        onClick={() => handleAcceptReject("image3D", true)}
                    >
                        Accept
                    </button>
                    <button 
                        className="btn btn-danger mt-2"
                        onClick={() => handleAcceptReject("image3D", false)}
                    >
                        Reject
                    </button>
                </div>

                <div className="col-md-6 mt-4">
                    <h5>Front View</h5>
                    <img src={quote.frontView} alt="Front View" className="img-fluid" />
                    <button 
                        className="btn btn-success me-2 mt-2"
                        onClick={() => handleAcceptReject("frontView", true)}
                    >
                        Accept
                    </button>
                    <button 
                        className="btn btn-danger mt-2"
                        onClick={() => handleAcceptReject("frontView", false)}
                    >
                        Reject
                    </button>
                </div>

                <div className="col-md-6 mt-4">
                    <h5>Rear View</h5>
                    <img src={quote.rearView} alt="Rear View" className="img-fluid" />
                    <button 
                        className="btn btn-success me-2 mt-2"
                        onClick={() => handleAcceptReject("rearView", true)}
                    >
                        Accept
                    </button>
                    <button 
                        className="btn btn-danger mt-2"
                        onClick={() => handleAcceptReject("rearView", false)}
                    >
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewDesign;
