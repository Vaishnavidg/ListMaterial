import React, { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import contractABI from "./MaterialABI.json"; 
import { ethers } from "ethers";
import ReactModal from "react-modal";
import AddMaterialModal from "./AddMaterialModal";
const contractAddress = "0xa5fcc0544c967aCfD24602088ae065f478f2069e"; 
// import Modal from "react-modal";

export default function OwnerSection() {
  const [provider, setProvider] = useState(null);
  const [Contract, setContract] = useState(null);
  const [AccountAddress, setAccountAddress] = useState(null);
  const [errormessage, setErrormessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materialName, setMaterialName] = useState("");
  const [materialUrl, setMaterialUrl] = useState("");
  const [materialDescription, setMaterialDescription] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [materials, setMaterials] = useState([]);

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

  //2. Owner will add Material by giving-> material name, material description and material url.
  const addMaterial = async () => {
    setisLoading(true);
    console.log(AccountAddress);
    if (Contract && AccountAddress) {
      try {
        const signer = provider.getSigner(); // Get the signer
        const contractWithSigner = Contract.connect(signer);

        //-> Call the addMaterial function from the smart contract
        const transaction = await contractWithSigner.addMaterial(
          materialName,
          materialDescription,
          materialUrl
        );
        await transaction.wait(); //-> Wait for the transaction.
        alert("Material added successfully!");
        console.log("Material added successfully!");
        setisLoading(false);
        //-> Close the modal after adding material
        setIsModalOpen(false);

        setMaterialName("");
        setMaterialDescription("");
      } catch (error) {
        console.error("Error adding material:", error);
      }
    }
  };

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
    <div className="App">
        <h1>Owner Section</h1>
      {" "}
      <button className="connect2" onClick={() => setIsModalOpen(true)}>
        Add Material
      </button>
       {/* open AddMaterialModal */}
      <AddMaterialModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        handleMaterialNameChange={(e) => setMaterialName(e.target.value)}
        handleMaterialDescriptionChange={(e) =>
          setMaterialDescription(e.target.value)
        }
        handleMaterialUrlChange={(e) => setMaterialUrl(e.target.value)}
        handleAddMaterial={addMaterial}
        materialName={materialName}
        materialDescription={materialDescription}
        materialUrl={materialUrl}
        isLoading={isLoading}
      />

      {/* to view all the materials */}
      <button className="connect2" onClick={getAllMaterials}>
        View Materials
      </button>
      {errormessage}
      <div>
        <h3>All Materials:</h3>
        <ul>
          {materials.map((material, index) => (
            <div className="card" key={index}>
              <li>
                <strong> {material.name}</strong>,{" "}
              </li>
              <li>
                {" "}
                <strong> {material.description}</strong> ,{" "}
              </li>

              <li>
                {" "}
                <strong>{material.imageUrl}</strong>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
