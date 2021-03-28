const { json } = require("express");
const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");

let productController = {
	cart: function (req, res) {
		res.render(path.resolve(__dirname, "../views/products/productCart.ejs"), {
			user: req.session.userLogged,
		});
	},
	add: function (req, res) {
		res.render(path.resolve(__dirname, "../views/products/addProduct.ejs"), {
			user: req.session.userLogged,
		});
	},
	detail: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
		const prodId = req.params.id;
		const product = products.find((prod) => {
			return prod.id == prodId;
		});

		res.render(path.resolve(__dirname, "../views/products/productDetail.ejs"), {
			product,
			user: req.session.userLogged,
		});
	},
	store: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
		newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

		const newProduct = {
			id: newId,
			name: req.body.name,
			createdBy: req.body.createdBy,
			price: Number(req.body.price),
			whatFor: req.body.whatFor,
			content: req.body.content,
			description: req.body.description,
			program: req.body.program,
			image: req.file.filename,
		};

		products.push(newProduct);

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 4));
		res.redirect("/");
	},
	edit: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
		const prodId = req.params.id;
		const product = products.find((prod) => {
			return prod.id == prodId;
		});

		res.render(path.resolve(__dirname, "../views/products/editProduct.ejs"), {
			product,
			user: req.session.userLogged,
		});
	},
	update: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
		const prodId = req.params.id;
		const product = products.find((prod) => {
			return prod.id == prodId;
		});

		product.name = req.body.name;
		product.createdBy = req.body.createdBy;
		product.price = Number(req.body.price);
		product.whatFor = req.body.whatFor;
		product.content = req.body.content;
		product.description = req.body.description;
		product.program = req.body.program;

		fs.writeFileSync(productsFilePath, JSON.stringify(products));
		res.redirect("/");
	},
	destroy: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
		const produtIndex = products.findIndex((prod) => {
			return prod.id == req.params.id;
		});
		products.splice(produtIndex, 1);

		fs.writeFileSync(productsFilePath, JSON.stringify(products));
		res.redirect("/");
	},
};

module.exports = productController;
