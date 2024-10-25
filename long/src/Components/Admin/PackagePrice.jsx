// src/components/PackagePrice.js
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const PackagePrice = () => {
  const [packages, setPackages] = useState([
    { minVolume: 0, maxVolume: 10 },
    { minVolume: 11, maxVolume: 20 },
    { minVolume: 21, maxVolume: 50 },
    { minVolume: 51, maxVolume: 100 },
    { minVolume: 101, maxVolume: 3000 },
  ]);

  const [selectedPackageType, setSelectedPackageType] = useState("");

  const handlePackageChange = (index, field, value) => {
    const newPackages = [...packages];
    newPackages[index][field] = value;
    setPackages(newPackages);
  };

  const handleAddPackage = () => {
    setPackages([...packages, { minVolume: "", maxVolume: "" }]);
  };

  const handlePriceGenerate = (index) => {
    const minVolume = packages[index].minVolume;
    const maxVolume = packages[index].maxVolume;
    const generatedPrice = (parseFloat(minVolume) + parseFloat(maxVolume)) * 10;
    alert(`Generated Price: ${generatedPrice.toFixed(2)}`);
  };

  const handleSubmit = () => {
    console.log("Submitted Packages:", packages);
    alert("Packages submitted successfully!");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header text-center bg-primary text-white">
          <h2>Package Price</h2>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="packageType" className="form-label mr-2"><strong>Package Type: </strong></label>
            <select
              className="form-control col-4"
              id="packageType"
              value={selectedPackageType}
              onChange={(e) => setSelectedPackageType(e.target.value)}
            >
              <option value="">Choose a package type</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="deluxe">Deluxe</option>
            </select>
            <div className="col-3">
              <button className="btn btn-success" onClick={handleAddPackage}>
                New Package
              </button>
            </div>
          </div>

          <div className="row g-4">
            {packages.map((pkg, index) => (
              <div className="col-md-6" key={index}>
                <div className="p-3 border rounded bg-light">
                  <div className="mb-3">
                    <div className="col-5 d-flex p-2">
                      <label htmlFor={`minVolume-${index}`} className="form-label mr-2"><strong>Min Volume:</strong></label>
                      <input
                        type="number"
                        className="form-control col-4"
                        id={`minVolume-${index}`}
                        value={pkg.minVolume}
                        onChange={(e) => handlePackageChange(index, "minVolume", e.target.value)}
                        placeholder="Min Volume"
                      />
                    </div>
                    <div className="col-5 d-flex p-2">
                      <label htmlFor={`maxVolume-${index}`} className="form-label mr-2"><strong>Max Volume:</strong></label>
                      <input
                        type="number"
                        className="form-control col-4"
                        id={`maxVolume-${index}`}
                        value={pkg.maxVolume}
                        onChange={(e) => handlePackageChange(index, "maxVolume", e.target.value)}
                        placeholder="Max Volume"
                      />
                    </div>
                  </div>
                  <div className="d-flex p-2">
                    <label htmlFor={`maxVolume-${index}`} className="form-label mr-2"><strong>Price:</strong></label>
                    <input
                      type="text"
                      className="form-control col-8"
                      id="price"
                      // value={height}d
                      // onChange={(e) => setHeight(e.target.value)}
                      placeholder="Enter price"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="btn btn-success mt-4" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackagePrice;
