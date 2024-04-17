const express = require("express");
const router = express.Router();

const Products = require("../Model/productDetails");

router.post("/add", async (req, res) => {
  try {
    const newProducts = await Products.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stockQuantity: req.body.stockQuantity,
      category: req.body.category,
      imageUrl: req.body.imageUrl,
      createdAt: Date.now(),
    });
    res.json(newProducts);
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const allProducts = await Products.find();
    res.json(allProducts);
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const product = await Products.findOne(req.params._id);
    if (product == null) {
      res.json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.json(error.message);
  }
});

router.put("/:productId", async (req, res) => {
  try {
    const updateProduct = await Products.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
      }
    );
    if (!updateProduct) {
      res.json({ Message: "Product not found" });
    }
    res.json(updateProduct);
  } catch (error) {
    res.json(error.message);
  }
});

router.delete("/:productId", async (req, res) => {
  try {
    await Products.findByIdAndDelete(req.params.productId);
    res.json({ Message: "Product Removed successfully" });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = router;
