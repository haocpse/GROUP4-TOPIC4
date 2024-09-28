import React from 'react';
import KoiPond from '../Assests/hocaikoi2.jpg';

const EconomicPackage = () => {
    return (
       <section className="service-section"> 
        <h2 className="service-title">ECONOMIC PACKAGE</h2>

        <div className="image-container">
            <img src={KoiPond} alt="" className="package-image" />

            {/* free fire */}

            <span className="popular-eco">
            <i class="fa-solid fa-scale-balanced scale-icon"></i>
            &nbsp;&nbsp; STABLE
            </span>
        </div>
        <p>Affordable price VND/m³</p>

             {/* Quotation */}

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
                    <td>4.600.000 VND</td>
                    <td>4.400.000 VND</td>
                    <td>4.200.000 VND</td>
                </tr>
                <tr>
                    <td>Decoration</td>
                    <td>4.000.000 VND</td>
                    <td>3.700.000 VND</td>
                    <td>3.400.000 VND</td>
                    <td>3.100.000 VND</td>
                    <td>2.800.000 VND</td>
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
         {/* Content */}
         <div className="content-package">
            <h4>PACKAGE CONTENT</h4>
            <table className="content-table">
                <tbody>
                    <tr>
                        <td>1. Bottom and wall concrete of the pond</td>
                        <td>7. Japanese filter equipment</td>
                    </tr>
                    <tr>
                        <td>2. Oil tank waterproofing</td>
                        <td>8. Japanese push-pull pump</td>
                    </tr>
                    <tr>
                        <td>3. 2 layer cloud-patterned cobblestone revetment</td>
                        <td>9 .Floating LED floodlights</td>
                    </tr>
                    <tr>
                        <td>4. Ancient stone waterfall - snow mountain</td>
                        <td>10. Small flowers and basic shrubs</td>
                    </tr>
                    <tr>
                        <td>5. 3-compartment rough filter</td>
                        <td>11 .Decorative Bonsai</td>
                    </tr>
                    <tr>
                        <td>6. Vertical drum filter - 90% clean</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
       </section>
    );
};

export default EconomicPackage;
