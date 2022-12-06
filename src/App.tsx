import React from "react";
import "./App.css";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "./components/Modal";
import { Product } from "./services/Product.service";

const products = [
  {
    _id: "1",
    product_name: "Apple",
    img_url: "",
  },
  {
    _id: "2",
    product_name: "Orange",
    img_url: "",
  },
  {
    _id: "3",
    product_name: "Banana",
    img_url: "",
  },
];

function App() {
  const [products, setProducts] = React.useState<Array<Product>>([]);
  const [newProdFile, setProdFile] = React.useState<File>();
  const [preview, setPreview] = React.useState("");
  const [newProduct, setNewProduct] = React.useState<{
    product_name: string;
    img_url: string;
  }>({ product_name: "", img_url: "" });
  const [showModal, setShowModal] = React.useState(false);
  React.useEffect(() => {
    if (!newProdFile) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(newProdFile);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [newProdFile]);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProdFile(event.target.files[0]);
    }
  };
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
        {products?.map((product: Product) => (
          <li key={product._id}>
            <img
              className="product-img"
              src={product.img_url}
              alt={product.product_name}
            />
            <span>{product.product_name}</span>
          </li>
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
            {newProdFile && preview ? (
              <img
                alt="Not Found"
                style={{ marginTop: "10px" }}
                width={"250px"}
                src={preview}
              />
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
