import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import Inventory from "./Inventory";
import AddProduct from "./AddProduct";

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        setItems(data);
      } catch (error) {
        console.log("failed to fetch", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard items={items} />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route
          path="/Inventory/AddProduct"
          element={<AddProduct setItems={setItems} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
