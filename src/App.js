import "./App.css";
import { useState } from "react";

let nextId = 3;

function App() {
  const [productNameInputValue, setProductNameValue] = useState("");
  const [products, setProducts] = useState([
    { id: 1, amount: 1, name: "milk" },
    { id: 2, amount: 1, name: "salt" },
  ]);

  function handleAddClick() {
    if (productNameInputValue.trim() === "") return;
    setProducts([
      ...products,
      { id: nextId, name: productNameInputValue, amount: 1 },
    ]);
    nextId = nextId + 1;
    setProductNameValue("");
  }

  function handleDeleteClick(id) {
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);
  }

  function handleAddAmountClick(id) {
    const newProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, amount: product.amount + 1 };
      } else {
        return product;
      }
    });
    setProducts(newProducts);
  }

  function handleSubAmountClick(id) {
    const newProducts = products.map((product) => {
      if (product.id === id && product.amount > 1) {
        return { ...product, amount: product.amount - 1 };
      } else {
        return product;
      }
    });
    setProducts(newProducts);
  }

  const productsList = products.map((product) => (
    <li className="product-item" key={product.id}>
      <span className="product-name">
        {product.name}: {product.amount}
      </span>
      <div className="button-group">
        <button
          className="amount-button"
          onClick={() => handleAddAmountClick(product.id)}
        >
          +
        </button>
        <button
          className="amount-button"
          onClick={() => handleSubAmountClick(product.id)}
        >
          -
        </button>
        <button
          className="delete-button"
          onClick={() => handleDeleteClick(product.id)}
        >
          Delete
        </button>
      </div>
    </li>
  ));

  return (
    <div className="app">
      <h1 className="title">List of Products to Buy</h1>

      {products.length > 0 ? (
        <ul className="product-list">{productsList}</ul>
      ) : (
        <p className="empty-message">No products yet. Add some!</p>
      )}

      <div className="add-product">
        <input
          value={productNameInputValue}
          onChange={(event) => setProductNameValue(event.target.value)}
          type="text"
          placeholder="Enter product name"
        />
        <button onClick={handleAddClick} className="add-button">
          Add
        </button>
      </div>
    </div>
  );
}

export default App;
