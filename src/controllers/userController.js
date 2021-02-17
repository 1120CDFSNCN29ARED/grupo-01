const path = require("path");

let userController = {
	register: function (req, res) {
		res.render(path.resolve(__dirname, "../views/users/register.ejs"));
	},
	login: function (req, res) {
		res.render(path.resolve(__dirname, "../views/users/login.ejs"));
	},
};

module.exports = userController;
