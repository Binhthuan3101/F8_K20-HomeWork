import express from "express";
const app = express();
const port = 3000;

const products = [
  { id: 1, name: "Product 1", price: 2000 },
  { id: 2, name: "Product 2", price: 2000 },
  { id: 3, name: "Product 3", price: 2000 },
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.port("/products", (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.json(products)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
