import React, { useEffect, useState } from "react";
import "./App.css";
import contractABI from "./MaterialABI.json"; 
import { ethers } from "ethers";
const contractAddress = "0xac48FD75b6367F7E20d5CcA0123b676aa2dd20F9"; 



export default function UserSection() {
     const [provider, setProvider] = useState(null);
     const [Contract, setContract] = useState(null);
     const [AccountAddress, setAccountAddress] = useState(null);
      const [materials, setMaterials] = useState([]);
      const [errormessage, setErrormessage] = useState(null);
  //1. Connect contract.
  const ConnectContract = async () => {
    if (window.ethereum) {
      try {
        const providers = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(providers);

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccountAddress(accounts[0]);

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          providers.getSigner()
        );

        setContract(contract);

        console.log(accounts);
      } catch (error) {
        console.error("Error connecting contract:", error);
        setErrormessage("Error connecting contract");
      }
    } else {
      setErrormessage("Install Metamask!");
    }
  };

  useEffect(() => {
    //-> connect contract using Connect Contract and get Contract and userAddress
    ConnectContract();
  }, []);

  //3. get All Materials to view.
  const getAllMaterials = async () => {
    try {
      if (Contract && AccountAddress) {
        //-> Call the getAllMaterials function from the smart contract
        const materials = await Contract.getAllMaterials();
        setMaterials(materials);
      }
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };
  return (
    <div className="container">
      <h1>UserSection</h1>
      {/* to view all the materials */}
      <button className="connect2" onClick={getAllMaterials}>
        View Materials
      </button>
      {errormessage}
      <h3>All Materials:</h3>
      <div className="Card_arrange">
        {materials.map((material, index) => (
          <div className="card" key={index}>
            <img src={material.imageUrl} alt="Profile" className="image" />
            <div className="textContainer">
              <h2 className="name">{material.name}</h2>
              <p className="description">{material.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
