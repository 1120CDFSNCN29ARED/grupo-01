const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");

let homeController = {
	index: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
		res.render(path.resolve(__dirname, "../views/index.ejs"), {
			products,
		});
	},
};

module.exports = homeController;
