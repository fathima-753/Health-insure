import React, { useState } from "react";
import Web3 from "web3"; // Import web3.js
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const App = () => {
  const policies = [
    {
      id: 1,
      name: "Health Insurance Basic",
      details:
      "A Health Insurance Basic Policy typically costs ₹3,000 to ₹10,000 annually for a sum insured of ₹3–5 lakhs, depending on age, health conditions, and provider. It covers hospitalization, pre/post-treatment expenses, daycare procedures, and cashless treatment at network hospitals. It ensures financial security and access to quality healthcare during emergencies. "  },
    {
      id: 2,
      name: "Health Insurance Premium",
      details:
        "Covers up to ₹40,00,000 and includes dental care. Ideal for families or individuals seeking comprehensive health coverage with additional benefits like dental treatment.",
    },
    {
      id: 3,
      name: "Health Insurance VIP",
      details:
        "Unlimited coverage with private room benefits. This is the most premium option, designed for individuals who want the best health services, including luxury hospital stays and no expense limits.",
    },
  ];

  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [documents, setDocuments] = useState({
    identityProof: [],
    addressProof: [],
    medicalHistory: [],
    photograph: [],
  });
  const [uploadError, setUploadError] = useState(null);

  const navigate = useNavigate();

  const handlePolicyChange = (event) => {
    const policyId = parseInt(event.target.value, 10);
    const policy = policies.find((p) => p.id === policyId);
    setSelectedPolicy(policy);
  };

  const handleFileUpload = (event, category) => {
    const files = Array.from(event.target.files);
    const validFileTypes = ["image/jpeg", "image/png", "application/pdf"];
    const areFilesValid = files.every((file) =>
      validFileTypes.includes(file.type)
    );

    if (!areFilesValid) {
      setUploadError(
        "Only JPEG, PNG, or PDF files are allowed. Please upload valid documents."
      );
      return;
    }

    setDocuments((prevDocs) => ({
      ...prevDocs,
      [category]: files,
    }));
    setUploadError(null);
  };

  const web3 = new Web3(window.ethereum);
  const contractABI = [
    {
      anonymous: false,
      inputs: [
        { indexed: false, internalType: "string", name: "name", type: "string" },
        { indexed: false, internalType: "string", name: "details", type: "string" },
        { indexed: false, internalType: "address", name: "applicant", type: "address" },
        { indexed: false, internalType: "uint256", name: "timestamp", type: "uint256" },
      ],
      name: "PolicySubmitted",
      type: "event",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "policies",
      outputs: [
        { internalType: "string", name: "name", type: "string" },
        { internalType: "string", name: "details", type: "string" },
        { internalType: "address", name: "applicant", type: "address" },
        { internalType: "uint256", name: "timestamp", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        { internalType: "string", name: "_name", type: "string" },
        { internalType: "string", name: "_details", type: "string" },
      ],
      name: "submitPolicy",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getPolicyCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
      name: "getPolicy",
      outputs: [
        { internalType: "string", name: "name", type: "string" },
        { internalType: "string", name: "details", type: "string" },
        { internalType: "address", name: "applicant", type: "address" },
        { internalType: "uint256", name: "timestamp", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
  ];
  const contractAddress = "0x6B55188EC9f0441e7288d19C407C6f3F6fCb40C0"; // Replace with your contract address

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const handleApply = async () => {
    const allDocumentsUploaded = Object.values(documents).every(
      (files) => files.length > 0
    );

    if (selectedPolicy && allDocumentsUploaded) {
      const accounts = await web3.eth.getAccounts();

      contract.methods
        .submitPolicy(selectedPolicy.name, selectedPolicy.details)
        .send({ from: accounts[0] })
        .on("transactionHash", (hash) => {
          alert(`Transaction sent! Hash: ${hash}`);
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          alert(
            `Policy submitted successfully! Receipt: ${JSON.stringify(receipt)}`
          );
          navigate("/patient/homepage");
        })
        .on("error", (error) => {
          alert(`An error occurred: ${error.message}`);
        });

      alert(
        `You have applied for: ${selectedPolicy.name}\nDetails: ${selectedPolicy.details}\nUploaded Documents: ${Object.entries(
          documents
        )
          .map(([category, files]) => `${category}: ${files.map((f) => f.name).join(", ")}`)
          .join("\n")}`
      );
    } else if (!selectedPolicy) {
      alert("Please select a policy before applying.");
    } else {
      alert("Please upload all the required documents before applying.");
    }
  };
  const divStyle={
   backgroundColor:"rgba(0, 4, 255, 0.57)",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        marginTop: "20px",
       fontSize:"22px",   
  }
  return (
    <div
      style={divStyle}>
      <h1>Apply for a Policy</h1>

      <label htmlFor="policy-select">Select a Policy:</label>
      <select id="policy-select" onChange={handlePolicyChange} defaultValue="">
        <option value="" disabled>
          -- Choose a Policy --
        </option>
        {policies.map((policy) => (
          <option key={policy.id} value={policy.id}>
            {policy.name}
          </option>
        ))}
      </select>

      {selectedPolicy && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            backgroundColor:"white",
            color:"black"
          }}
        >
          <h2>Policy Details</h2>
          <p>
            <strong>Name:</strong> {selectedPolicy.name}
          </p>
          <p>
            <strong>Details:</strong> {selectedPolicy.details}
          </p>
        </div>
      )}

      <div style={{ marginTop: "20px", 
        
        fontSize:"20px",
        color:"white"
      }}>
        <h3>Upload Required Documents</h3>

        {["identityProof", "addressProof", "medicalHistory", "photograph"].map(
          (category) => (
            <div key={category} style={{ marginBottom: "20px", color:"white"}}>
              <label htmlFor={`file-upload-${category}`}>
                {category
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}:
              </label>
              <input
                id={`file-upload-${category}`}
                type="file"
                accept=".jpeg,.jpg,.png,.pdf"
                multiple
                onChange={(event) => handleFileUpload(event, category)}
              />
              {documents[category]?.length > 0 && (
                <ul>
                  {documents[category].map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>
          )
        )}

        {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
      </div>

      <button
        onClick={handleApply}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize:"20px"
        }}
      >
        Apply
      </button>
    </div>
  );
};

export default App;
