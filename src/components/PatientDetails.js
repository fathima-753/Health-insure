import React, { useState } from 'react';
import { BrowserProvider, Contract } from "ethers";
import './PatientDetails.css';

const PatientDetails = () => {
    const [username, setUsername] = useState('');
    const [patientDetails, setPatientDetails] = useState({
        name: '',
        dob: '',
        gender: '',
        phone: '',
        username: ''
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setUsername(e.target.value);
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (typeof window.ethereum === "undefined") {
          alert("Please install MetaMask!");
          return;
      }
  
      try {
          const provider = new BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contractAddress = "0x80267493d3F4a5d5BA4afD062cA0e1980D09fF6c";
          const contractABI = [
              {
                  "inputs": [
                      {
                          "internalType": "string",
                          "name": "_username",
                          "type": "string"
                      }
                  ],
                  "name": "getPatientDetailsByUsername",
                  "outputs": [
                      {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                      },
                      {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                      },
                      {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                      },
                      {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                      },
                      {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                      }
                  ],
                  "stateMutability": "view",
                  "type": "function",
                  "constant": true
              }
          ];
  
          const contract = new Contract(contractAddress, contractABI, signer);
  
          // Call contract function to fetch details based on username
          const [name, dob, gender, phone, usernameFromContract] = await contract.getPatientDetailsByUsername(username);
  
          if (name) {
              // Calculate age from the dob (birthdate)
              const birthDate = new Date(dob * 1000); // Convert Unix timestamp to JavaScript Date object
              const age = calculateAge(birthDate);
  
              setPatientDetails({ name, age, gender, phone, username: usernameFromContract });
              setError('');
          } else {
              setError('No patient found with this username.');
          }
      } catch (error) {
          console.error('Error fetching patient details:', error);
          setError('Failed to fetch patient details. Please try again.');
      }
  };
  
    // Function to calculate age from birth date
    const calculateAge = (birthDate) => {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div className="patient-details-container">
            <h1>Patient Details</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Enter Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={handleInputChange}
                        placeholder="Enter the username"
                    />
                </div>
                <button type="submit" className="submit-btn">Get Details</button>
            </form>

            {error && <p className="error-message">{error}</p>}

            {patientDetails.name && (
                <div className="patient-info">
                    <h2>Patient Information</h2>
                    <p><strong>Name:</strong> {patientDetails.name}</p>
                    <p><strong>Age:</strong> {patientDetails.age}</p>
                    <p><strong>Gender:</strong> {patientDetails.gender}</p>
                    <p><strong>Phone:</strong> {patientDetails.phone}</p>
                    <p><strong>Username:</strong> {patientDetails.username}</p>
                </div>
            )}
        </div>
    );
};

export default PatientDetails;
