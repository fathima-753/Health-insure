import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Contract } from "ethers";
import { BrowserProvider } from "ethers/providers";

const PatientHomepage = () => {
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const patientAddress = localStorage.getItem("userAddress");
  const contractAddress = "0x80267493d3F4a5d5BA4afD062cA0e1980D09fF6c";

  const contractABI = useMemo(
    () => [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address",
          },
        ],
        "name": "patients",
        "outputs": [
          { "internalType": "string", "name": "name", "type": "string" },
          { "internalType": "uint256", "name": "dob", "type": "uint256" },
          { "internalType": "string", "name": "gender", "type": "string" },
          { "internalType": "string", "name": "phone", "type": "string" },
          { "internalType": "string", "name": "username", "type": "string" },
        ],
        "stateMutability": "view",
        "type": "function",
      },
    ],
    []
  );

  const fetchPatientDetails = useCallback(
    async (address) => {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      try {
        setLoading(true);
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(contractAddress, contractABI, signer);

        console.log("Fetching patient details for address:", address);

        const patientDetails = await contract.patients(address);

        if (patientDetails && patientDetails.length) {
          const [name, dob, gender, phone, username] = patientDetails;

          // Convert BigInt dob (Unix timestamp) to a number
          const dobDate = dob.toString().length === 10 ? Number(dob) * 1000 : Number(dob); 

          setPatientData({
            name,
            dob: new Date(dobDate * 1000).toLocaleDateString(), // Convert UNIX timestamp to readable date
            gender,
            phone,
            username,
          });
          setError("");
        } else {
          setError("No patient data found for this address.");
        }
      } catch (err) {
        console.error("Error fetching patient details:", err);
        setError(`Failed to fetch patient details. Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    },
    [contractABI]
  );

  useEffect(() => {
    if (!patientAddress) {
      alert("You are not logged in. Redirecting to login page.");
      window.location.href = "/patient/login"; 
    } else {
      fetchPatientDetails(patientAddress);
    }
  }, [patientAddress, fetchPatientDetails]);

  const handleLogout = () => {
    localStorage.setItem("userAddress", null);
    alert("Logging out...");
    window.location.href = "/home";
  };
  return (
    <div className="wrapper">
      <nav id="sidebar">
        <div className="profile-header">
          <div className="profile-pic"></div>
          <h1>Patient Homepage</h1>
        </div>
        <ul className="sidebar-nav">
          <li className="active">
            <a href="#profile">Profile</a>
          </li>
      
          <li>
            <a href="/apply/forpolicy">Apply for Policy</a>
          </li>
          <li>
            <a href="/apply/forclaim">Apply for Claim</a>
          </li>
          <li onClick={handleLogout}>
            <a href="#logout">Logout</a>
          </li>
        </ul>
      </nav>
      <div className="container">
      {loading ? (
            <p>Loading...</p>
          ) : patientData ? (
            <div>
              <h3> Your profile</h3>
              <h3>Welcome {patientData.name} !!</h3>
             
              <p>
                <strong>Username: </strong>{patientData.username}
              </p>
              <p>
                <strong>Date of Birth: </strong> {patientData.dob}
              </p>
              <p>
                <strong>Gender: </strong> {patientData.gender}
              </p>
              <p>
                <strong>Phone: </strong> {patientData.phone}
              </p>
            </div>
          ) : (
            <p className="error">{error}</p>
          )}
          </div>
    </div>
  );
};
export default PatientHomepage;
