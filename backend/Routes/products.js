const {
  postProduct,
  deleteProduct,
  getAllProducts,
  collectionProducts,
  popularProducts,
  addToCart,
  removeFromCart,
  getCart
} = require("../Controllers/products");
const {fetchingUser} = require("../Middleware/addToCart")
const express = require("express");
const router = express.Router();

router.post("/add", postProduct);
router.delete("/:id", deleteProduct);
router.get("/all", getAllProducts);
router.get("/collection", collectionProducts);
router.get("/popular", popularProducts);
router.post('/addcart' , fetchingUser , addToCart)
router.post('/removecart' , fetchingUser , removeFromCart)
router.post('/getCart' , fetchingUser ,getCart)

module.exports = router;
