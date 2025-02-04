import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserProvider, Contract } from 'ethers';
import './Login.css';

const CompanyLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Clear storage and cookies on component load
    localStorage.clear();
    sessionStorage.clear();

    setUsername('');
    setPassword('');

    document.cookie.split(';').forEach((cookie) => {
      document.cookie = cookie.replace(
        /=.*/,
        '=;expires=' + new Date().toUTCString() + ';path=/'
      );
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask!');
      return;
    }

    // Initialize ethers provider
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Contract details
    const contractAddress = '0x318618D293e146958D2bF8589eFcab03c09cEf99'; // Replace with your contract address
    const contractABI = [
      {
        "inputs": [
          { "internalType": "string", "name": "_username", "type": "string" },
          { "internalType": "string", "name": "_password", "type": "string" }
        ],
        "name": "login",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
      }
    ];

    // Initialize contract
    const contract = new Contract(contractAddress, contractABI, signer);

    try {
      // Call the login function from the contract
      const loginSuccessful = await contract.login(username, password);
      
      if (loginSuccessful) {
        console.log('Login successful!');
        navigate('/company/homepage'); // Redirect to company homepage
      } else {
        setError('Invalid credentials, please try again.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Error during login. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h1>Company Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="company-username"
            name="company-username"
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
            id="company-password"
            name="company-password"
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="submit-button">Login</button>
      </form>
      <p>
                Don't have an account? <a href="/company/register">Register here</a>
            </p>
    </div>
  );
};

export default CompanyLogin;
