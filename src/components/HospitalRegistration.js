import React, { useState } from 'react';
import './HospitalRegistration.css';
import { BrowserProvider, Contract } from "ethers";
const HospitalRegistration = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        phone: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true; 

        if (!formData.name) {
            newErrors.name = 'Hospital name is required';
            isValid = false;
        }
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
            isValid = false;
        }
        if (!formData.username) {
            newErrors.username = 'Username is required';
            isValid = false;
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(newErrors); 
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (typeof window.ethereum === "undefined") {
            alert("Please install MetaMask!");
            return;
        }

        if (validateForm()) {
            console.log('Form submitted successfully!', formData);
        } else {
            console.log('Validation failed', errors);
        }

        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
        const contractAddress = "0x409De87dc44f89339E19bD620801BA41cf6d9B76";
        const contractABI =  [
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
              "type": "function",
              "constant": true
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
              "type": "function",
              "constant": true
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
              "type": "function",
              "constant": true
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
              "type": "function",
              "constant": true
            }
          ];

        const contract = new Contract(contractAddress, contractABI, signer);
    
        const { name, phone, username, password } = formData;
    
        try {
            const tx = await contract.registerHospital(
                name,
                phone,
                username,
                password
            );
            console.log("Transaction sent:", tx);
    
            await tx.wait(); 
            console.log("Hospital registered successfully!");
        } catch (error) {
            console.error("Error registering hospital:", error);
        }
    };

    return (
        <div className="registration-container">
            <h1>Hospital Registration</h1>
           <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Hospital Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your hospital name"
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                    />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Choose a username"
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
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                </div>
                <div className="form-group">
                    <button type="submit" className="submit-btn">Register</button>
                </div>
            </form>
            <p>Already registered? <a href="/hospital/login">Login here</a></p>
        </div>
    );
};
export default HospitalRegistration;
