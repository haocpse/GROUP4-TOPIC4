import React from 'react';
import KoiPond from '../Assests/backyard-koi-pond-neave-group-outdoor-solutions_8685.jpg';
const VipPackage = () => {
    return (
        <section className="service-section"> 
        <h2 className="service-title">VIP PACKAGE</h2>

        <div className="image-container">
            <img src={KoiPond} alt="" className="package-image" />

            {/* free fire */}

            <span className="popular">
            <i class="fa-solid fa-crown crown-icon"></i>
            &nbsp;&nbsp; EXPENSIVE
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
                    <td>5.500.000 VND</td>
                    <td>5.000.000 VND</td>
                    <td>4.500.000 VND</td>
                    <td>4.100.000 VND</td>
                    <td>3.500.000 VND</td>
                </tr>
                <tr>
                    <td>Filtration system</td>
                    <td>5.000.000 VND</td>
                    <td>3.500.000 VND</td>
                    <td>3.000.000 VND</td>
                    <td>2.500.000 VND</td>
                    <td>1.800.000 VND</td>
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
                        <td>10. All Japanese pumps</td>
                    </tr>
                    <tr>
                        <td>2. Oil tank waterproofing</td>
                        <td>11. Floating LED floodlights</td>
                    </tr>
                    <tr>
                        <td>3. Epoxy waterproofing</td>
                        <td>12. Underwater LED floodlights</td>
                    </tr>
                    <tr>
                        <td>4. 3-layer cloud-patterned pebble embankment</td>
                        <td>13. Misting - Automatic smoke spraying</td>
                    </tr>
                    <tr>
                        <td>5. Large ancient stone smoke bridge waterfall</td>
                        <td>14. Small flowers and basic shrubs</td>
                    </tr>
                    <tr>
                        <td>6. 4-compartment rough filter</td>
                        <td>15. Decorative flying bonsai</td>
                    </tr>
                    <tr>
                        <td>7. Vertical drum filter - 100% clean</td>
                        <td>16. Decorative La Han pine</td>
                    </tr>
                    <tr>
                        <td>8. Set automatic timer equipment</td>
                        <td>17. Wooden floor of filter pit</td>
                    </tr>
                    <tr>
                        <td>9. Japanese filter equipment</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
       </section>
    );
};

export default VipPackage;
