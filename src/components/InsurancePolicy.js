import React, { useState } from "react";
import Web3 from "web3";
import "./PatientHomepage.css";

const InsurancePolicy = () => {
  const [policyName, setPolicyName] = useState("");
  const [policyDetails, setPolicyDetails] = useState("");
  const [premiumAmount, setPremiumAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.setItem("userAddress", null);
    alert("Logging out");
    window.location.href = "/Home";
  };

  // Smart contract interaction setup
  const addPolicyToBlockchain = async () => {
    if (!policyName || !policyDetails || !premiumAmount) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);

      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with deployed contract address
        const contractABI = [/* Your Smart Contract ABI */];
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Current user address
        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];

        // Call the smart contract method to add a policy
        await contract.methods
          .addPolicy(policyName, policyDetails, parseInt(premiumAmount))
          .send({ from: userAddress });

        alert("Policy added successfully!");
        setPolicyName("");
        setPolicyDetails("");
        setPremiumAmount("");
      } else {
        alert("Please install MetaMask to interact with the blockchain.");
      }
    } catch (error) {
      console.error("Error adding policy:", error);
      alert("An error occurred while adding the policy.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="wrapper">
      <nav id="sidebar">
        <div className="profile-header">
          <div className="profile-pic"></div>
          <h3>User Address</h3>
        </div>
        <ul className="sidebar-nav">
          <li className="active">
            <a href="/company/homepage">Profile</a>
          </li>
          <li>
            <a href="#add-policies">Add Policy</a>
          </li>
          <li>
            <a href="#verify">Verify Claim</a>
          </li>
          <li>
            <a href="#view-patient-data">View Patient Data</a>
          </li>
          <li onClick={handleLogout}>
            <a href="#logout">Logout</a>
          </li>
        </ul>
      </nav>
      <div className="content">
        <h2>Add New Policy</h2>
        <div className="policy-form">
          <input
            type="text"
            placeholder="Policy Name"
            value={policyName}
            onChange={(e) => setPolicyName(e.target.value)}
          />
          <textarea
            placeholder="Policy Details"
            value={policyDetails}
            onChange={(e) => setPolicyDetails(e.target.value)}
          />
          <input
            type="number"
            placeholder="Premium Amount"
            value={premiumAmount}
            onChange={(e) => setPremiumAmount(e.target.value)}
          />
          <button onClick={addPolicyToBlockchain} disabled={loading}>
            {loading ? "Adding Policy..." : "Add Policy"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsurancePolicy;
