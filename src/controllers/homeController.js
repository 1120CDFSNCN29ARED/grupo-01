const path = require("path");

let homeController = {
	index: function (req, res) {
		res.render(path.resolve(__dirname, "../views/index.ejs"));
	},
};

module.exports = homeController;
