const path = require("path");

let productController = {
	product: function (req, res) {
		res.render(path.resolve(__dirname, "../views/products/productDetail.ejs"));
	},
	cart: function (req, res) {
		res.render(path.resolve(__dirname, "../views/products/productCart.ejs"));
	},
	add: function (req, res) {
		res.render(path.resolve(__dirname, "../views/products/addProduct.ejs"));
	},
};

module.exports = productController;
