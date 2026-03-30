// import express, { json } from "express";
// import fs from "fs";

const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 5000;

// app.use(json());
app.use(express.json());

function getProducts() {
  const data = fs.readFileSync("products.json", "utf8");
  return JSON.parse(data);
}

function saveProducts(products) {
  fs.writeFileSync("products.json", JSON.stringify(products, null, 2));
}

app.get("/products", (req, res) => {
  const products = getProducts();

  res.status(200).json({
    success: true,
    data: products,
  });
});

app.get("/products/:id", (req, res) => {
  const products = getProducts();
  const id = Number(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

app.post("/products", (req, res) => {
  const products = getProducts();

  const { name, price } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({
      success: false,
      message: "Name and price are required",
    });
  }

  const newProduct = {
    id: Date.now(),
    name,
    price,
  };

  products.push(newProduct);
  saveProducts(products);

  res.status(201).json({
    success: true,
    data: newProduct,
  });
});

app.put("/products/:id", (req, res) => {
  const products = getProducts();

  const id = Number(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const { name, price } = req.body;

  if (name === undefined && price === undefined) {
    return res.status(400).json({
      success: false,
      message: "Name or price required to update",
    });
  }

  if (name !== undefined) {
    product.name = name;
  }

  if (price !== undefined) {
    product.price = price;
  }

  saveProducts(products);

  res.status(200).json({
    success: true,
    data: product,
  });
});

app.delete("/products/:id", (req, res) => {
  const products = getProducts();

  const id = Number(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const newProducts = products.filter((p) => p.id !== id);

  saveProducts(newProducts);

  res.status(200).json({
    success: true,
    data: product,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
