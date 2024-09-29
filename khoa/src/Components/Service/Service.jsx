import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import BasicPackage from "./BasicPackage";
import EconomicPackage from "./EconomicPackage";
import VipPackage from "./VipPackage";

const Service = () => {
    return (
        <div className="service-type">
            <Navbar/>
            <BasicPackage />
            <hr />
            <EconomicPackage/>
            <hr />
            <VipPackage/>
            <Footer/>
        </div>
    );
}

export default Service;