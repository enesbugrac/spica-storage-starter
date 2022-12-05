import React from "react";
import "./App.css";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "./components/Modal";

const products = [
  {
    _id: "1",
    product_name: "Apple",
  },
  {
    _id: "1",
    product_name: "Orange",
  },
  {
    _id: "1",
    product_name: "Banana",
  },
];

function App() {
  const [newProduct, setNewProduct] = React.useState<{
    product_name: string;
    img_url: string;
  }>({ product_name: "", img_url: "" });

  const [showModal, setShowModal] = React.useState(false);
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {};
  const handleAddProduct = (event: React.MouseEvent<HTMLButtonElement>) => {};
  return (
    <div className="App">
      <h1>Spica Storage </h1>
      <ul className="product-list">
        <li
          onClick={(e) => setShowModal(true)}
          style={{ cursor: "pointer" }}
          key={"product._id"}
        >
          <big>+ Add New Product</big>
        </li>
        {products?.map((product) => (
          <li key={product._id}>{product.product_name}</li>
        ))}
      </ul>
      <Modal show={showModal} setShow={setShowModal} hideCloseButton={false}>
        <ModalHeader>
          <h2>New Product</h2>
        </ModalHeader>
        <ModalBody>
          <div className="input-container">
            <input
              className="product-input"
              name="product_name"
              type="text"
              placeholder="Enter new product name..."
              value={newProduct?.product_name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewProduct({ ...newProduct, product_name: e.target.value })
              }
            />
            <input type="file" onChange={onFileChange} />
            {newProduct.img_url.length ? (
              <img alt="not found" width={"250px"} src={newProduct.img_url} />
            ) : null}
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="submit-button" onClick={handleAddProduct}>
            Submit
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
