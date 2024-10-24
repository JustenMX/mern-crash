import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

// middelware
app.use(express.json()); // allows us to accept JSON data in the req.body

//controller
app.get("/api/products", (req, res) => {
  //res.send("Server is ready Sir Justen");
});

app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save(); // save to database
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in creating Product, error.message");
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product does not exist" });
    }
    res.status(204).json({ success: true, message: "Delete successful" });
  } catch (error) {
    console.error("Error in deleting Product");
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.listen(4000, () => {
  connectDB();
  console.log("Server started at http://localhost:4000");
});
