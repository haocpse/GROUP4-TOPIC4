// src/components/PackagePrice.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const PackagePrice = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [selectedPackageType, setSelectedPackageType] = useState("");
  const [newPackageType, setNewPackageType] = useState("");
  const [packagePrice, setPackagePrice] = ([])
  const [packagePriceInfo, setPackagePriceInfo] = ([])

  useEffect(() => {
    const fetchPackagePrice = async () => {
      const response = await axios.get(`http://localhost:8080/packagePrices`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
        }
      });
      setPackagePrice(response.data.data)
      setPackagePriceInfo(response.data.data.packagePriceInfoResponseList)
    }
  fetchPackagePrice()  
  })

  const handleAddPackage = () => {
    setIsInputVisible(true);
  };

  const handleCancelPackage = () => {
    setIsInputVisible(false);
    setSelectedPackageType('');
  };

  const handlePackageChange = (packageId) => {

  }

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header text-center bg-danger text-white">
          <h2 className="pt-1">Package Price</h2>
        </div>
        <div className="card-body">
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="packageType" className="form-label mt-2 mr-2">
              <strong>Package Type: </strong>
            </label>
            {isInputVisible ? (
              <input
                type="text"
                className="form-control col-4"
                placeholder="New package type"
                value={newPackageType}
                onChange={(e) => handlePackageChange(e.target.value, "new")}
              />
            ) : (
              <select
                className="form-control col-4"
                id="packageType"
                value={selectedPackageType}
                onChange={(e) => handlePackageChange(e.target.value)}
              >
               <option value="">Select Package</option>
                {packagePrice.map((pkg) => (
                  <option key={pkg.packageId} value={pkg.packageId}>
                    {pkg.packageType}
                  </option>
                ))}
              </select>
            )}
            <div className="col-3">
              {!isInputVisible ? (
                <button className="btn btn-primary" onClick={handleAddPackage}>
                  New Package
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleCancelPackage}>
                  Choose Package
                </button>
              )}
            </div>
          </div>

          <div className="row g-4">
            {packagePriceInfo.map((pkg, index) => (
              <div className="col-md-6" key={index}>
                <div className="p-3 border rounded bg-light">
                  <div className="mb-3">
                    <div className="col-5 d-flex p-2">
                      <label htmlFor={`minVolume-${index}`} className="form-label mt-2 mr-2"><strong>Min Volume:</strong></label>
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
                      <label htmlFor={`maxVolume-${index}`} className="form-label mt-2 mr-2"><strong>Max Volume:</strong></label>
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
                    <label htmlFor={`maxVolume-${index}`} className="form-label mt-2 mr-2"><strong>Price:</strong></label>
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
          <div className="mt-2">
            {!isInputVisible ? (
              <button className="btn btn-primary" onClick={handleAddPackage}>
                Save
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleCancelPackage}>
                Add new
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagePrice;
