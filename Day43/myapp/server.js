import express from "express";
const app = express();
const port = 3001;

const products = [
  { id: 1, name: "Product 1", price: 2000 },
  { id: 2, name: "Product 2", price: 2000 },
  { id: 3, name: "Product 3", price: 2000 },
];

app.get("/products", (req, res) => {
  res.json({
    items: products,
    total: products.length,
    totalPages: 1,
    currentPage: 1,
  });
});

app.get("/products/:id", (req, res) => {
  const productId = Number(req.params.id);
  const productIndex = products.findIndex(
    (product) => product.id === productId,
  );
  if (!Number.isInteger(productId) || productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(products[productIndex]);
});

app.post("/products", (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json(products);
});

app.listen(port, () => {
  console.log(`Product app listening on port ${port}`);
});
