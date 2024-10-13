import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const ViewDesign = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [designDetail, setDesignDetail] = useState([]);
    // xu ly approve

    useEffect(() => {
        const fetchDesginDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/manage/designs/${id}`)
                setDesignDetail(response.data.data)
                console.log(designDetail)
            } catch { }
        }
        fetchDesginDetail();
    }, [])


    const handleApproval = async (status) => {
        try {
            await axios.post(`http://localhost:8080/manage/designs/${id}`, {
                status: status
            });
            toast.success(`Design ${status} successfully!`);
            // fetchDesigns();
        } catch (error) {
            console.error("Error approving/rejecting design", error);
            toast.error(`Fail to update status!^^ ${error.response ? error.response.data.message : ''}`);

        }

    };
    const confirmApproval = (status) => {
        const action = status ? "APPROVED" : "REJECTED";
        const confirmed = window.confirm(`Are you sure to want to ${action} this design?`);
        if (confirmed) {
            handleApproval(status);
        }
    };
    return (
        <div className="container mt-4">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
            <h2 className="text-center" style={{ color: 'black' }}>Design Details</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Design ID: {designDetail.designId}</h5>
                    <p className="card-text"><strong>Customer Name:</strong> {designDetail.customerName}</p>
                    <p className="card-text"><strong>Design ID:</strong> {designDetail.designId}</p>
                    <p className="card-text"><strong>Customer Request:</strong> {designDetail.customerRequrest}</p>


                    <div className="img-desgin">
                        <h6>Design Images:</h6>
                        <div className="row text-center">
                            <div className="col-md-3 mb-3">
                                <img
                                    src={designDetail.url2dDesgin}
                                    alt="2D Design"
                                    className="img-fluid img-thumbnail"
                                    style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px' }}
                                />
                                <p>2D Design</p>
                            </div>
                            <div className="col-md-3 mb-3">
                                <img
                                    src={designDetail.url3dDesgin}
                                    alt="3D Design"
                                    className="img-fluid img-thumbnail"
                                    style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px' }}
                                />
                                <p>3D Design</p>
                            </div>
                            <div className="col-md-3 mb-3">
                                <img
                                    src={designDetail.urlFrontDesign}
                                    alt="Front Design"
                                    className="img-fluid img-thumbnail"
                                    style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px' }}
                                />
                                <p>Front Design</p>
                            </div>
                            <div className="col-md-3 mb-3">
                                <img
                                    src={designDetail.urlBackDesign}
                                    alt="Back Design"
                                    className="img-fluid img-thumbnail"
                                    style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px' }}
                                />
                                <p>Back Design</p>
                            </div>
                        </div>
                    </div>
                    <button
                        className="btn btn-success me-2"
                        onClick={() => confirmApproval("APPROVED")}
                    >
                        Approve
                    </button>
                    <button
                        className="btn btn-danger me-2"
                        onClick={() => confirmApproval("REJECTED")}
                    >
                        Reject
                    </button>
                    <button className="btn btn-secondary" onClick={() => navigate(-1)}>Go Back</button>
                </div>
            </div>
        </div>
    );
}
export default ViewDesign;

// import React from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";

// const ViewDesign = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { designId } = useParams();
//     const { design } = location.state;


//     // Dữ liệu giả để thử nghiệm
//     const mockDesign = {
//         designId: designId,
//         customerName: "Alice",
//         description: "A beautiful house design.",
//         status: "Pending",
//         url2dDesgin: "https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2023/07/hinh-dep.jpg.webp",  // Thay đổi thành URL hợp lệ
//         url3dDesgin: "hocakoi.jpg",  // Thay đổi thành URL hợp lệ
//         urlFrontDesign: "hocakoi.jpg",  // Thay đổi thành URL hợp lệ
//         urlBackDesign: "hocakoi.jpg"  // Thay đổi thành URL hợp lệ
//     };

//     // const design =  mockDesign;

//     // In ra URL để kiểm tra
//     console.log(design.url2dDesgin, design.url3dDesgin, design.urlFrontDesign, design.urlBackDesign);

//     const handleApproval = (status) => {
//         toast.success(`Design ${status ? "approved" : "rejected"} successfully!`);
//     };

//     const confirmApproval = (status) => {
//         const action = status ? "approve" : "reject";
//         const confirmed = window.confirm(`Are you sure to want to ${action} this design?`);
//         if (confirmed) {
//             handleApproval(status);
//         }
//     };

//     return (
//         <div className="container mt-4">
//             <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
//             <h2 className="text-center" style={{ color: 'black' }}>Design Details</h2>
//             <div className="card">
//                 <div className="card-body">
//                     <h5 className="card-title">Design ID: {design.designId}</h5>
//                     <p className="card-text"><strong>Customer Name:</strong> {design.customerName}</p>
//                     <p className="card-text"><strong>Description:</strong> {design.description}</p>
//                     <p className="card-text"><strong>Status:</strong> {design.status}</p>

//                     <div className="image-gallery">
//                         <h6>Design Images:</h6>
//                         <div className="row text-center">
//                             <div className="col-md-3 mb-3">
//                                 {console.log(design)}
//                                 <img
//                                     src={ design.url2dDesgin }
//                                     alt="2D Design"
//                                     className="img-fluid img-thumbnail"
//                                     style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px' }}
//                                 />
//                                 <p>2D Design</p>
//                             </div>
//                             <div className="col-md-3 mb-3">
//                                 <img
//                                     src={''}
//                                     alt="3D Design"
//                                     className="img-fluid img-thumbnail"
//                                     style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px' }}
//                                 />
//                                 <p>3D Design</p>
//                             </div>
//                             <div className="col-md-3 mb-3">
//                                 <img
//                                     src={design.urlFrontDesign || 'default-image.png'}
//                                     alt="Front Design"
//                                     className="img-fluid img-thumbnail"
//                                     style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px' }}
//                                 />
//                                 <p>Front Design</p>
//                             </div>
//                             <div className="col-md-3 mb-3">
//                                 <img
//                                     src={design.urlBackDesign || 'default-image.png'}
//                                     alt="Back Design"
//                                     className="img-fluid img-thumbnail"
//                                     style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px' }}
//                                 />
//                                 <p>Back Design</p>
//                             </div>
//                         </div>
//                     </div>

//                     <button
//                         className="btn btn-success me-2"
//                         onClick={() => confirmApproval(true)}
//                     >
//                         Approve
//                     </button>
//                     <button
//                         className="btn btn-danger me-2"
//                         onClick={() => confirmApproval(false)}
//                     >
//                         Reject
//                     </button>
//                     <button className="btn btn-secondary" onClick={() => navigate(-1)}>Go Back</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ViewDesign;
