import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { BrowserProvider, Contract } from "ethers";

const HospitalLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all session and storage data (if required)
    localStorage.clear();
    sessionStorage.clear();

    setUsername('');
    setPassword('');

    document.cookie.split(';').forEach((cookie) => {
      document.cookie = cookie.replace(
        /=.*/g,
        '=;expires=' + new Date().toUTCString() + ';path=/'
      );
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask!");
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contractAddress = "0x409De87dc44f89339E19bD620801BA41cf6d9B76"; 
    const contractABI = [
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
        "type": "function",
        "constant": true
      }
    ];

    const contract = new Contract(contractAddress, contractABI, signer);

    try {
      // Call the login function in the contract to verify username and password
      const isAuthenticated = await contract.login(username, password);
      
      if (isAuthenticated) {
        console.log("Login successful!");
        // If login is successful, navigate to the HospitalHomepage
        navigate('/hospital/homepage');
      } else {
        alert("Invalid username or password. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="login-container">
      <h1>Hospital Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="hospital-username"
            name="hospital-username"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="new-username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="hospital-password"
            name="hospital-password"
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
      <p>
                Don't have an account? <a href="/hospital/register">Register here</a>
            </p>
    </div>
  );
};

export default HospitalLogin;
