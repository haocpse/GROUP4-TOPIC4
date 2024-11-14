import React, { useEffect, useState } from "react";
import axios from "axios";

const PackagePrice = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [newPackageType, setNewPackageType] = useState("");
  const [packagePrice, setPackagePrice] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [selectedPackageDetails, setSelectedPackageDetails] = useState({
    packageType: "",
    packagePriceInfoResponseList: [],
  });
  const [packagePriceAfter, setPackagePriceAfter] = useState([]);

  const fetchPackagePrice = async () => {
    const response = await axios.get("http://localhost:8080/packagePrices", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
      }
    });
    setPackagePrice(response.data.data);
  };
  useEffect(() => {

    fetchPackagePrice();
  }, []);

  const handleAddPackage = () => {
    setIsInputVisible(true);
    setNewPackageType("");
    setSelectedPackageDetails({
      packageType: "",
      packagePriceInfoResponseList: Array(5).fill({
        minVolume: "",
        maxVolume: "",
        price: "",
      }),
    });
    setSelectedPackageId(null); // Reset selected package ID for new package
  };

  const handleCancelPackage = () => {
    setIsInputVisible(false);
    setNewPackageType("");
    setSelectedPackageId(null);
    setSelectedPackageDetails({ packageType: "", packagePriceInfoResponseList: [] });
  };

  const handleInputChange = (index, field, value) => {
    setSelectedPackageDetails((prev) => {
      const updatedPriceInfo = [...prev.packagePriceInfoResponseList];
      updatedPriceInfo[index] = {
        ...updatedPriceInfo[index],
        [field]: value,
      };
      return { ...prev, packagePriceInfoResponseList: updatedPriceInfo };
    });
  };

  const handleSavePackage = async () => {
    const packageData = {
      packageType: selectedPackageDetails.packageType,
      packagePrices: selectedPackageDetails.packagePriceInfoResponseList,
    };

    try {
      if (selectedPackageId) {
        // Update existing package
        const response = await axios.put(`http://localhost:8080/packagePrice/${selectedPackageId}`, packageData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
          }
        });
        setPackagePriceAfter(response.data.data)
        console.log("Package updated successfully:", response.data);
      } else {
        const response = await axios.post("http://localhost:8080/package", packageData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
          }
        });
        setPackagePriceAfter(response.data.data)
        console.log("Package created successfully:", response.data);
      }

      setIsInputVisible(false);
      setNewPackageType("");
      setSelectedPackageId(null);
      setSelectedPackageDetails({ packageType: "", packagePriceInfoResponseList: [] });

      const updatedPackagePrice = selectedPackageId ?
        packagePrice.map(pkg => pkg.packageId === selectedPackageId ? packagePriceAfter : pkg) :
        [...packagePrice, packagePriceAfter];

      setPackagePrice(updatedPackagePrice);
      fetchPackagePrice()
    } catch (error) {
      console.error("Error saving package:", error);
    }
  };

  const handlePackageSelect = (e) => {
    const packageId = e.target.value;
    setSelectedPackageId(packageId);
    const selectedPackage = packagePrice.find((pkg) => pkg.packageId === packageId);

    if (selectedPackage) {
      // Sort packagePriceInfoResponseList by minVolume
      const sortedPriceInfo = [...selectedPackage.packagePriceInfoResponseList].sort((a, b) => {
        return (parseFloat(a.minVolume) || 0) - (parseFloat(b.minVolume) || 0);
      });

      setSelectedPackageDetails({
        packageType: selectedPackage.packageType,
        packagePriceInfoResponseList: sortedPriceInfo,
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header text-center bg-danger text-white">
          <h2 className="pt-1">Package Price</h2>
        </div>
        <div className="card-body">
          {!isInputVisible && (<div className="mb-3 d-flex align-items-center">
            <label htmlFor="packageSelect" className="form-label mt-2 mr-2">
              <strong>Select Package:</strong>
            </label>
            <select className="form-control col-4" id="packageSelect" onChange={handlePackageSelect}>
              <option value="">Select Package</option>
              {packagePrice.map((pkg) => (
                <option key={pkg.packageId} value={pkg.packageId}>
                  {pkg.packageType}
                </option>
              ))}
            </select>
            <button className="btn btn-primary ml-3" onClick={handleAddPackage}>
              New Package
            </button>
          </div>)}

          {isInputVisible && (
            <div className="mb-3">
              <label htmlFor="packageType" className="form-label">
                <strong>Package Type:</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="packageType"
                placeholder="Enter package type"
                value={selectedPackageDetails.packageType}
                onChange={(e) => setSelectedPackageDetails((prev) => ({ ...prev, packageType: e.target.value }))}
              />
            </div>
          )}

          <div className="row g-4">
            {selectedPackageDetails.packagePriceInfoResponseList.map((pkg, index) => (
              <div className="col-md-6" key={index}>
                <div className="p-3 border rounded bg-light">
                  <div className="mb-3">
                    <div className="col-5 d-flex p-2">
                      <label htmlFor={`minVolume-${index}`} className="form-label mt-2 mr-2">
                        <strong>Min Volume:</strong>
                      </label>
                      <input
                        type="number"
                        className="form-control col-4"
                        id={`minVolume-${index}`}
                        value={pkg.minVolume}
                        onChange={(e) => handleInputChange(index, "minVolume", e.target.value)}
                        placeholder="Min Volume"
                      />
                    </div>
                    <div className="col-5 d-flex p-2">
                      <label htmlFor={`maxVolume-${index}`} className="form-label mt-2 mr-2">
                        <strong>Max Volume:</strong>
                      </label>
                      <input
                        type="number"
                        className="form-control col-4"
                        id={`maxVolume-${index}`}
                        value={pkg.maxVolume}
                        onChange={(e) => handleInputChange(index, "maxVolume", e.target.value)}
                        placeholder="Max Volume"
                      />
                    </div>
                  </div>
                  <div className="d-flex p-2">
                    <label htmlFor={`price-${index}`} className="form-label mt-2 mr-2">
                      <strong>Price:</strong>
                    </label>
                    <input
                      type="number"
                      className="form-control col-8"
                      id={`price-${index}`}
                      value={pkg.price}
                      onChange={(e) => handleInputChange(index, "price", e.target.value)}
                      placeholder="Enter price"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedPackageId && ( // Display the button only when an old package is selected
            <div className="mt-2">
              <button className="btn btn-primary" onClick={handleSavePackage}>
                Update Package
              </button>
              <button className="btn btn-secondary ml-2" onClick={handleCancelPackage}>
                Cancel
              </button>
            </div>
          )}

          {isInputVisible && !selectedPackageId && ( // Display the save button only for new package
            <div className="mt-2">
              <button className="btn btn-primary" onClick={handleSavePackage}>
                Save Package
              </button>
              <button className="btn btn-secondary ml-2" onClick={handleCancelPackage}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackagePrice;
