require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ethers } = require("ethers");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Blockchain Configuration
const CONTRACT_ADDRESS = "0xe876796bB04F4C8ceb5F6d9D591E763f8698F08c";
const CONTRACT_ABI = [
  {
    inputs: [
      { internalType: "string", name: "_username", type: "string" },
      { internalType: "string", name: "_password", type: "string" },
    ],
    name: "login",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
];

const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL); // Replace with your RPC URL
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

// API Endpoints
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const isValid = await contract.login(username, password);

    if (isValid) {
      return res.status(200).json({ message: "Login successful", username });
    } else {
      return res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "An error occurred during login" });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
