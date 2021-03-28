var express = require("express");
var router = express.Router();

const productController = require("../controllers/productController");

const uploadFile = require("../middlewares/multerMiddleware");

/* router.get("/productDetail", productController.product); */
router.get("/productCart", productController.cart);

router.get("/addProduct", productController.add);
router.post("/", uploadFile.single("image"), productController.store);

router.get("/:id", productController.detail);

router.get("/:id/edit", productController.edit);
router.put("/:id", productController.update);

router.delete("/:id", productController.destroy);

module.exports = router;
