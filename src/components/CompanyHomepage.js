import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import "./CompanyHomepage.css";

const CompanyHomepage = () => {
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        if (typeof window.ethereum === "undefined") {
          alert("Please install MetaMask!");
          return;
        }
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const companyAddress = await signer.getAddress();
        const contractAddress = "0x318618D293e146958D2bF8589eFcab03c09cEf99";
        const contractABI = [
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_companyAddress",
                "type": "address"
              }
            ],
            "name": "getCompanyDetails",
            "outputs": [
              { "internalType": "string", "name": "name", "type": "string" },
              { "internalType": "string", "name": "phone", "type": "string" },
              { "internalType": "string", "name": "username", "type": "string" }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ];

        const contract = new Contract(contractAddress, contractABI, provider);
        const details = await contract.getCompanyDetails(companyAddress);
        setCompanyDetails({
          name: details.name,
          phone: details.phone,
          username: details.username
        });
      } catch (error) {
        console.error("Error fetching company details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, []);

  const handleLogout = () => {
    localStorage.setItem("userAddress", null);
    alert("Logging out");
    window.location.href = "/Home";
  };

  return (
    <div className="wrapper">
      <nav id="sidebar">
        <div className="profile-header">
          <div className="profile-pic"></div>
          <h1>Company Homepage</h1>
        </div>
        <ul className="sidebar-nav">
          <li className="active">
            <a href="/company/homepage">Profile</a>
          </li>
          <li>
            <a href="#verify">Verify Claim</a>
          </li>
          <li>
            <a href="/patient/details">View Patient Data</a>
          </li>
          <li onClick={handleLogout}>
            <a href="#logout">Logout</a>
          </li>
        </ul>
      </nav>
      <div className="content">
        <div className="profile-details">
          <div className="tab-header">
            Welcome to <span>{companyDetails ? companyDetails.name : "Loading..."}</span>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : companyDetails ? (
            <div>
              <div className="profile-row">
                <label>Username: <span>{companyDetails.username}</span></label>
              </div>
              <div className="profile-row">
                <label>Phone: <span>{companyDetails.phone}</span></label>
              </div>
              <p>
                Our health insurance company provides a wide array of insurance products aimed at protecting individuals and families from the financial burden of healthcare expenses. We offer policies that cover a variety of services, including hospitalizations, outpatient treatments, surgeries, prescriptions, preventive care, and diagnostic tests. Our mission is to ensure that our clients have access to quality healthcare without the stress of unexpected medical bills.
              </p>
            </div>
          ) : (
            <p>No details found. Please ensure you're logged in.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyHomepage;
