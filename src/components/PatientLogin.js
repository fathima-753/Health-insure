import React, { useState, useEffect } from 'react';
import './Login.css';
import { BrowserProvider, Contract } from 'ethers';
import { useNavigate } from 'react-router-dom';

const PatientLogin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const resetFormOnReload = () => {
            setFormData({
                username: '',
                password: '',
            });
        };

        window.addEventListener('load', resetFormOnReload);

        return () => window.removeEventListener('load', resetFormOnReload);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
            isValid = false;
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!validateForm()) return;
  
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
  
      const contractAddress = '0x03A003c3623109d9c04Df2B359545B44E74ca6Db'; // Replace with your contract address
      const contractABI =  [
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
              "stateMutability": "nonpayable",
              "type": "function"
          }
      ];
      const contract = new Contract(contractAddress, contractABI, signer);
      const { username, password } = formData;
  
      try {
          // Call the contract's login function only once
          const isValidLogin = await contract.login(username, password);
  
          if (isValidLogin) {
              // Only navigate if login is successful
              alert('Login successful!');
              localStorage.setItem("userAddress", await signer.getAddress()); // Optionally store user address
              navigate('/patient/homepage'); 
          } else {
              alert('Invalid username or password.');
          }
      } catch (error) {
          console.error('Error during login:', error);
          alert('An error occurred during login. Please try again.');
      }
  };
  

    return (
        <div className="login-container">
            <h1>Patient Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter your username"
                        autoComplete="off"
                    />
                    {errors.username && <span className="error">{errors.username}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        autoComplete="off"
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>

                <div className="form-group">
                    <button type="submit" className="submit-btn">Login</button>
                </div>
            </form>
            <p>
                Don't have an account? <a href="/patient/register">Register here</a>
            </p>
        </div>
    );
};

export default PatientLogin;
