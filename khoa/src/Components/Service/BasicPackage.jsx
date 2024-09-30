import React from "react";
import KoiPond from '../Assests/ho-ca-koi-dep.jpg';
import './Service.css';

const BasicPackage = () => {
    return (
        <section className="service-section">
        <h2 className="service-title">BASIC PACKAGE <i class="star fa-solid fa-star"></i></h2>

        {/* Hình ảnh minh họa gói dịch vụ */}
        <div className="image-container">
            <img src={KoiPond} alt="" className="package-image" />
            {/* free fire */}
            <span className="popular">
            <i class="fa-solid fa-fire fire-icon"></i>
              &nbsp;&nbsp; POPULAR
            </span>
        </div>
        <p>Affordable price VND/m³</p>

        {/* Bảng giá */}
        <table className="price-table">
            <thead>
                <tr>
                    <th>Pond volume</th>
                    <th>Under 10m³</th>
                    <th>From 10 to 20m³</th>
                    <th>From 20 to 50m³</th>
                    <th>From 50 to 100m³</th>
                    <th>Over 100m³</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Rough part</td>
                    <td>5.000.000 VND</td>
                    <td>4.800.000 VND</td>
                    <td>4.500.000 VND</td>
                    <td>4.400.000 VND</td>
                    <td>4.200.000 VND</td>
                </tr>
                <tr>
                    <td>Decoration</td>
                    <td>2.000.000 VND</td>
                    <td>1.700.000 VND</td>
                    <td>2.500.000 VND</td>
                    <td>2.000.000 VND</td>
                    <td>1.900.000 VND</td>
                </tr>
                <tr>
                    <td>Filtration system</td>
                    <td>3.000.000 VND</td>
                    <td>2.500.000 VND</td>
                    <td>2.000.000 VND</td>
                    <td>1.500.000 VND</td>
                    <td>1.000.000 VND</td>
                </tr>
            </tbody>
        </table>

        {/* Nội dung gói dịch vụ */}
        <div className="content-package">
            <h4>PACKAGE CONTENT</h4>
            <table className="content-table">
                <tbody>
                    <tr>
                        <td>1. Bottom and wall concrete of the pond</td>
                        <td>4. 4-compartment rough filter - 75% clean</td>
                    </tr>
                    <tr>
                        <td>2. Oil tank waterproofing</td>
                        <td>5. Taiwan pump and filter equipment</td>
                    </tr>
                    <tr>
                        <td>3. 1 layer cloud-patterned cobblestone revetment</td>
                        <td>6. Small flowers and basic shrubs</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    );
}
export default BasicPackage;