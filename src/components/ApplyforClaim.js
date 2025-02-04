import React, { useState } from "react";
import './ApplyforClaim.css';
const ApplyForClaim = () => {
  const [claimDetails, setClaimDetails] = useState({
    policyNumber: "",
    claimReason: "",
    claimAmount: "",
  });
  const [documents, setDocuments] = useState({
    claimForm: null,
    medicalCertificate: null,
    diagnosisReport: null,
    idProof: null,
    dischargeCard: null,
    prescriptionsAndBills: null,
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClaimDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setDocuments((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!claimDetails.policyNumber || !claimDetails.claimReason || !claimDetails.claimAmount) {
      setError("Please fill out all required fields.");
      return;
    }

    if (
      !documents.claimForm ||
      !documents.medicalCertificate ||
      !documents.diagnosisReport ||
      !documents.idProof ||
      !documents.dischargeCard ||
      !documents.prescriptionsAndBills
    ) {
      setError("Please upload all necessary documents.");
      return;
    }

    setError("");

    try {
      // Simulate submitting the claim (you can replace this with an actual API call)
      console.log("Claim Details:", claimDetails);
      console.log("Uploaded Documents:", documents);

      // Example: Upload documents and claim details to your server or blockchain
      // const formData = new FormData();
      // formData.append("policyNumber", claimDetails.policyNumber);
      // formData.append("claimReason", claimDetails.claimReason);
      // formData.append("claimAmount", claimDetails.claimAmount);
      // for (let key in documents) {
      //   formData.append(key, documents[key]);
      // }

      // await fetch("/api/submit-claim", { method: "POST", body: formData });

      setSuccessMessage("Claim submitted successfully!");
      setClaimDetails({ policyNumber: "", claimReason: "", claimAmount: "" });
      setDocuments({
        claimForm: null,
        medicalCertificate: null,
        diagnosisReport: null,
        idProof: null,
        dischargeCard: null,
        prescriptionsAndBills: null,
      });
    } catch (err) {
      console.error("Error submitting claim:", err);
      setError("Failed to submit the claim. Please try again later.");
    }
  };
  return (
    <div className="claim-form-wrapper">
      <h1>Apply for Claim</h1>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
       
        <div 
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            backgroundColor:"white",
            opacity:'0.9'
          }}className="form-group">
          <label htmlFor="claimAmount">Claim Amount </label>
          <input
            type="number"
            id="claimAmount"
            name="claimAmount"
            value={claimDetails.claimAmount}
            onChange={handleInputChange}
            required
          />
        </div>
        <div 
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            backgroundColor:"white",
            opacity:'0.9'
          }}className="form-group">
          <label htmlFor="claimForm">Upload Claim Form:</label>
          <input
            type="file"
            id="claimForm"
            name="claimForm"
            onChange={handleFileChange}
            required
          />
        </div>
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            backgroundColor:"white",
            opacity:'0.9'
          }} className="form-group">
          <label htmlFor="medicalCertificate">Upload Medical Certificate:</label>
          <input
            type="file"
            id="medicalCertificate"
            name="medicalCertificate"
            onChange={handleFileChange}
            required
          />
        </div>
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            backgroundColor:"white",
            opacity:'0.9'
          }} className="form-group">
          <label htmlFor="diagnosisReport">Upload Diagnosis Report:</label>
          <input
            type="file"
            id="diagnosisReport"
            name="diagnosisReport"
            onChange={handleFileChange}
            required
          />
        </div>
        <div   style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            backgroundColor:"white",
            opacity:'0.9'
          }} 
          className="form-group">
          <label htmlFor="idProof">Upload Aadhar Proof:</label>
          <input
            type="file"
            id="idProof"
            name="idProof"
            onChange={handleFileChange}
            required
          />
        </div>
        <div 
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            backgroundColor:"white",
            opacity:'0.9'
          }}className="form-group">
          <label htmlFor="dischargeCard">Upload Discharge Card:</label>
          <input
            type="file"
            id="dischargeCard"
            name="dischargeCard"
            onChange={handleFileChange}
            required
          />
        </div>
        <div 
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            backgroundColor:"white",
            opacity:'0.9'
          }}className="form-group">
          <label htmlFor="prescriptionsAndBills">Upload Prescriptions and Bills:</label>
          <input
            type="file"
            id="prescriptionsAndBills"
            name="prescriptionsAndBills"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit Claim
        </button>
      </form>
    </div>
  );
};

export default ApplyForClaim;
