const express = require("express");
const router = express.Router();

const {
  getProductById,
  getProduct,
  getAllProducts,
  createProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllUniqueCategories,
} = require("../controllers/product");

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// params
router.param("userId", getUserById);
router.param("productId", getProductById);

// read
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// listing route
router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);

// create
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

// delete
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

// update
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

module.exports = router;
