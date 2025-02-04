import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./HospitalHomepage.css";

const CONTRACT_ADDRESS = "0x409De87dc44f89339E19bD620801BA41cf6d9B76"; // Replace with your deployed contract address
const ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "hospitalAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "username",
        "type": "string"
      }
    ],
    "name": "HospitalRegistered",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "hospitals",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "phone",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "username",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "passwordHash",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "usernameExists",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_phone",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_username",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      }
    ],
    "name": "registerHospital",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_username",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      }
    ],
    "name": "login",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_hospitalAddress",
        "type": "address"
      }
    ],
    "name": "getHospitalDetails",
    "outputs": [
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
    "type": "function"
  }
];

const HospitalHomepage = () => {
  const [hospitalDetails, setHospitalDetails] = useState({
    name: "",
    phone: "",
    username: ""
  });

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        
        if (!window.ethereum) {
          alert("Please install MetaMask to interact with this dApp!");
          return;
        }

          const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const userAddress = await signer.getAddress();

        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

        const [name, phone, username] = await contract.getHospitalDetails(userAddress);

      
        setHospitalDetails({ name, phone, username });
      } catch (error) {
        console.error("Error fetching hospital details:", error);
        alert("Failed to fetch hospital details. Please try again.");
      }
    };

    fetchHospitalDetails();
  }, []);

  const handleLogout = () => {
    localStorage.setItem("userAddress", null);
    alert("Logging out");
    window.location.href = "/Home";
  };
  return (
    <div className="wrapper">
      <nav id="sidebar">
      <div className="profile-pic"></div>
      <h1>Hospital Homepage</h1>
        <ul className="sidebar-nav">
          <li className="active">
            <a href="/hospital/homepage">Profile</a>
          </li>
          <li>
            <a href="/generate/bill">Generate Bill</a>
          </li>
          <li>
            <a href="/patient/details">View Patient Details</a>
          </li>
          <li onClick={handleLogout}>
            <a href="#logout">Logout</a>
          </li>
        </ul>
      </nav>
      <div id="content">
       <div className="centered-container">
        
          <h3> <strong>Welcome to</strong>  {hospitalDetails.name || "Hospital Name"}</h3>
          <p><strong>Username :</strong>{hospitalDetails.username}</p>
          <p><strong>Phone :</strong>{hospitalDetails.phone}</p>
          <p>
          Our Hospital is a state-of-the-art healthcare facility committed to providing high-quality medical care to our community. We prioritize patient-centered services and are equipped with modern technology to ensure that every patient receives comprehensive care.</p>
        </div>
        
      </div>
    </div>
  );
};

export default HospitalHomepage;
