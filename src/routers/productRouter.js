var express = require("express");
var router = express.Router();
const productController = require("../controllers/productController");

router.get("/productDetail", productController.product);
router.get("/productCart", productController.cart);
router.get("/addProduct", productController.add);

module.exports = router;
