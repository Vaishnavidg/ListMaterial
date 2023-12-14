import React, { useState, useEffect } from "react";
import Web3 from "web3"; // You need to install web3, e.g., npm install web3
import MaterialContractABI from "./MaterialABI.json"; // Replace with your contract's ABI
const contractAddress = "0x58A5e1fbC3A22aF3c3386536Aa3f04E9670173e7"; // Replace with your contract's address

const Material = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    // Initialize Web3 and connect to the contract
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.enable();
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const contractInstance = new web3Instance.eth.Contract(
            MaterialContractABI,
            contractAddress
          );
          setContract(contractInstance);
          console.log("contract:",contractInstance);

          // Fetch and display materials
          fetchMaterials();
        } catch (error) {
          console.error("Error initializing Web3:", error);
        }
      } else {
        console.error("Web3 not found. Please install MetaMask.");
      }
    };

    initWeb3();
  }, []);

  const fetchMaterials = async () => {
    try {
      // Call the getMaterials function from the smart contract
      const result = await contract.methods.getMaterials().call();
      setMaterials(result);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  return (
    <div>
      <h1>Material Viewer</h1>
      <ul>
        {materials.map((material, index) => (
          <li key={index}>
            <strong>Name:</strong> {material.name},{" "}
            <strong>Description:</strong> {material.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Material;
