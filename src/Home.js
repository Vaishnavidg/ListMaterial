import React, { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import contractABI from "./MaterialABI.json";
import OwnerSection from "./OwnerSection";
import UserSection from "./UserSection";
import { Link } from "react-router-dom";
const contractAddress = "0xac48FD75b6367F7E20d5CcA0123b676aa2dd20F9";
// const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

export default function Home() {
  const [errormessage, setErrormessage] = useState(null);
  const [userAccount, setUserAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [ownerAddress, setOwnerAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [Contract, setContract] = useState(null);
  const [showMaterialLink, setShowMaterialLink] = useState(false);

  const accountChange = (AccountName) => {
    setUserAccount(AccountName);
  };

  //1. connect the wallet and get user address
  //2. Connect contract.
  const ConnectContract = () => {
    if (window.ethereum) {
      const providers = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(providers);
      if (provider) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((result) => {
            accountChange(result[0]);
            setContract(
              new ethers.Contract(contractAddress, contractABI, provider)
            );
          });
      }
    } else {
      setErrormessage("Install Metamask! ");
    }
  };

  //3. get OwnerAddress from the contract
  const fetchOwnerAddress = async () => {
    if (Contract) {
      try {
        //-> Call the getOwnerAddress function from the smart contract
        console.log(Contract);
        const result = await Contract.getOwnerAddress();
        console.log(result);
        setOwnerAddress(result);
        setShowMaterialLink(true);
        // console.log(result);
      } catch (error) {
        console.error("Error fetching owner address:", error);
      }
    }
  };

  return (
    <div className="container">
      <button className="connect2" onClick={ConnectContract}>
        MetaMask Connect
      </button>
      <div className="cont2">
        <p id="t1">Address</p>
      </div>
      <div className="cont3">
        <p id="t2">{userAccount}</p>
      </div>
      <button className="connect2" onClick={fetchOwnerAddress}>
        Get Owner Address
      </button>
      <div className="cont2">
        <p id="t1">Owner Address</p>
      </div>
      <div className="cont3">
        <p id="t2">{ownerAddress}</p>
      </div>

      {showMaterialLink && (
        <MaterialComponent
          userAddress={userAccount}
          ownerAddress={ownerAddress}
        />
      )}
      {errormessage}
    </div>
  );
}

//4.Compare owner Address and user Address to present next screen
const MaterialComponent = ({ userAddress, ownerAddress }) => {
  if (ownerAddress && userAddress) {
    console.log("Owner Address:", ownerAddress);
    console.log("User Account:", userAddress);

    if (ownerAddress.toLowerCase() === userAddress.toLowerCase()) {
      //->if owner Address and user Address is same then owner Section  will open
      console.log("Owner address and user address are the same");
      return (
        <Link to="/ownersection">
          <button className="connect2">ListofMaterial</button>
        </Link>
      );
    } else {
      //-> if owner Address and user Address is different then user Section will open
      console.log("Owner address and user address are different");
      return (
        <Link to="/usersection">
          <button className="connect2">ListofMaterial</button>
        </Link>
      );
    }
  }
  return <p>Loading...</p>;
};
