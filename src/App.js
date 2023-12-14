import React, { useEffect, useState } from "react";
import "./App.css";
import Material from "./Material";
import { ethers } from "ethers";
import contractABI from "./MaterialABI.json"; // Replace with your contract's ABI
import OwnerSection from "./OwnerSection";
import UserSection from "./UserSection";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
const contractAddress = "0xCDA550C05cF14644c899602f77Dd7c9D391ca568"; // Replace with your contract's address

export default function App() {
  // const [errormessage, setErrormessage] = useState(null);
  // const [userAccount, setUserAccount] = useState(null);
  // const [web3, setWeb3] = useState(null);
  // //  const [contract, setContract] = useState(null);
  // const [ownerAddress, setOwnerAddress] = useState(null);
  // const [provider, setProvider] = useState(null);
  // const [Contract, setContract] = useState(null);

  // const accountChange = (AccountName) => {
  //   setUserAccount(AccountName);
  // };

  //1. connect the wallet and get user address
  //2. Connect contract.
  // const ConnectContract = () => {
  //   if (window.ethereum) {
  //     const providers = new ethers.providers.Web3Provider(window.ethereum);
  //     setProvider(providers);
  //     if (provider) {
  //       window.ethereum
  //         .request({ method: "eth_requestAccounts" })
  //         .then((result) => {
  //           accountChange(result[0]);
  //           setContract(
  //             new ethers.Contract(contractAddress, contractABI, provider)
  //           );
  //         });
  //     }
  //   } else {
  //     setErrormessage("Install Metamask! ");
  //   }
  // };

  // //3. get OwnerAddress from the contract
  // const fetchOwnerAddress = async () => {
  //   if (Contract) {
  //     try {
  //       // Call the getOwnerAddress function from the smart contract
  //       console.log(Contract);
  //       const result = await Contract.getOwnerAddress();
  //       console.log(result);
  //       setOwnerAddress(result);
  //       // console.log(result);
  //     } catch (error) {
  //       console.error("Error fetching owner address:", error);
  //     }
  //   }
  // };
  // const Material = () => {
  //   if (ownerAddress && userAccount) {
  //     console.log("Owner Address:", ownerAddress);
  //     console.log("User Account:", userAccount);

  //     if (ownerAddress.toLowerCase() === userAccount.toLowerCase()) {
  //       <Link to="/ownersection">
  //         <button className="connect1">ListofMaterial</button>
  //       </Link>;
  //       console.log("Owner address and user address are the same");
  //     } else {
  //        <Link to="/usersection">
  //          <button className="connect1">ListofMaterial</button>
  //        </Link>;
  //       console.log("Owner address and user address are different");
  //     }
  //   }
  // };
  // useEffect(() => {
  //   // Compare addresses whenever ownerAddress or userAccount changes
  //   Material();
  // }, [ownerAddress, userAccount]);


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ownersection" element={<OwnerSection />} />
        <Route path="/usersection" element={<UserSection/>} /> 
      </Routes>{" "}
      {/* <button className="connect2" onClick={ConnectContract}>
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
      <button className="connect2" onClick={Material}>
        Material
      </button>
      {errormessage} */}
      {/* <Material /> */}
    </div>
  );
}
