import React from "react";
import { useState } from "react";

const AddProduct = ({setItems}) => {
  const [products, setProducts] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProducts((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payLoad = {
      id: 0,
      title: products.title,
      price: parseFloat(products.price),
      description: products.description,
      category: products.category,
      image: products.image,
    };

    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: 'POST',
        headers: {
          "content-type" : "application/json",
        },
        body: JSON.stringify(payLoad),
      });

      if(!response.ok){
        console.log(`server responded with: ${response.status}`)
      }

      const data = await response.json()

      console.log(`your data ${data}`)
      setItems((prev) => [...prev, data])
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="price" placeholder="Price" onChange={handleChange} />
        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />
        <input name="category" placeholder="Category" onChange={handleChange} />
        <input name="image" placeholder="Image URL" onChange={handleChange} />
        <button type="submit">Add Product</button>
      </form>
    </>
  );
};

export default AddProduct;
