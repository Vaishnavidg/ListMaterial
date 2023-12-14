import Modal from "react-modal";
import "./App.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const AddMaterialModal = ({
  isOpen,
  closeModal,
  handleMaterialNameChange,
  handleMaterialDescriptionChange,
  handleAddMaterial,
  materialName,
  materialDescription,
  handleMaterialUrlChange,
  isLoading,
  materialUrl,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Add Material Modal"
    >
      <h2 style={{ textAlign: "center" }}>Add Material</h2>
      <label>
        Material Name:
        <input
          type="text"
          value={materialName}
          onChange={handleMaterialNameChange}
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </label>
      <label>
        Material Description:
        <input
          type="text"
          value={materialDescription}
          onChange={handleMaterialDescriptionChange}
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </label>
      <label>
        Material Url:
        <input
          type="text"
          value={materialUrl}
          onChange={handleMaterialUrlChange}
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </label>
      <button
        className="connect2"
        onClick={handleAddMaterial}
        style={{ width: "50%" }}
      >
        {isLoading ? "Adding..." : "Add Material"}
      </button>
    </Modal>
  );
};

export default AddMaterialModal;
