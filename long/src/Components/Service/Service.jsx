import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import "./Service.css"

const Service = () => {
    const [packageTypes, setPackageTypes] = useState([])

    useEffect(() => {
        const fetchPackageTypes = async () => {
            const response = await axios.get(`http://localhost:8080/services`);
            setPackageTypes(response.data.data)
        }
        fetchPackageTypes()
    }, [])


    return (
        <>
        <Navbar />
            {packageTypes && packageTypes.map((packageType) => (
                <section className="service-section">
                    <h2 className="service-title">{packageType.packageType} PACKAGE <i className="star fa-solid fa-star"></i></h2>

                    {/* Hình ảnh minh họa gói dịch vụ */}
                    <div className="image-container">
                        <img src="" alt="" className="package-image" />
                    </div>
                    <p>Affordable price VND/m³</p>

                    {/* Bảng giá */}
                    <table className="price-table">
                        <thead>
                            <tr>
                                {packageType.priceResponseList.map((priceInfo, idx) => (
                                    <th key={idx}>
                                        {priceInfo.minVolume && priceInfo.minVolume !== 0 && priceInfo.maxVolume && priceInfo.maxVolume !== 3000
                                            ? `From ${priceInfo.minVolume} to ${priceInfo.maxVolume}m³`
                                            : priceInfo.minVolume === 0
                                                ? `Under ${priceInfo.maxVolume}m³`
                                                : `Over ${priceInfo.minVolume}m³`}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {packageType.priceResponseList.map((priceInfo, idx) => (
                                    <td key={idx}>{priceInfo.price.toLocaleString()} VND</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>

                    {/* Nội dung gói dịch vụ */}
                    <div className="content-package">
                        <h4>PACKAGE CONTENT</h4>
                        <table className="content-table">
                            <tbody>
                                {(packageType.constructionContentResponses || []).reduce((rows, item, index) => {
    
                                    if (index % 2 === 0) {
                                        rows.push([item]);
                                    } else {
                                        rows[rows.length - 1].push(item);
                                    }
                                    return rows;
                                }, []).map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {row.map((contentItem, colIndex) => (
                                            <td key={colIndex}>
                                                {contentItem.content} - {contentItem.price.toLocaleString()} VND
                                            </td>
                                        ))}
                                        {row.length < 2 && <td></td>} 
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            ))}
        </>
    );
}

export default Service;