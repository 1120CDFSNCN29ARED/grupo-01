const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const path = require("path");
const User = require("../models/User");
const fs = require("fs");

const usersFilePath = path.join(__dirname, "../data/usersDataBase.json");

let userController = {
	register: function (req, res) {
		res.cookie(";", { maxAge: 1000 * 30 });

		res.render(path.resolve(__dirname, "../views/users/register.ejs"));
	},
	login: function (req, res) {
		res.render(path.resolve(__dirname, "../views/users/login.ejs"));
	},
	processRegister: (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render(
				path.resolve(__dirname, "../views/users/register.ejs"),
				{
					errors: resultValidation.mapped(),
					oldData: req.body,
				}
			);
		}

		let userInDb = User.findByField("email", req.body.email);

		if (userInDb) {
			return res.render(
				path.resolve(__dirname, "../views/users/register.ejs"),
				{
					errors: {
						email: {
							msg: "Este email ya está registrado",
						},
					},
					oldData: req.body,
				}
			);
		}

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			profile_image: "default_profile.png",
		};

		let userCreated = User.create(userToCreate);
		return res.redirect("/user/login");
	},
	loginProcess: (req, res) => {
		let userToLogin = User.findByField("email", req.body.email);

		if (userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(
				req.body.password,
				userToLogin.password
			);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if (req.body.remember_user) {
					res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 2 });
				}

				return res.redirect("/user/profile");
			}
			return res.render(path.resolve(__dirname, "../views/users/login.ejs"), {
				errors: {
					email: {
						msg: "Los datos ingresados son invalidos.",
					},
				},
			});
		}

		return res.render(path.resolve(__dirname, "../views/users/login.ejs"), {
			errors: {
				email: {
					msg: "Este email no se encuentra registrado",
				},
			},
		});
	},
	profile: (req, res) => {
		return res.render(path.resolve(__dirname, "../views/users/profile.ejs"), {
			user: req.session.userLogged,
		});
	},
	logout: (req, res) => {
		res.clearCookie("userEmail");
		req.session.destroy();
		return res.redirect("/");
	},
	update: (req, res) => {
		const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
		const userId = req.session.userLogged.id;
		/* console.log(userId); */
		const user = users.find((usr) => {
			return usr.id == userId;
		});

		user.profile_image = req.file.filename;

		fs.writeFileSync(usersFilePath, JSON.stringify(users));
		return res.render(path.resolve(__dirname, "../views/users/profile.ejs"), {
			user,
		});
	},
};

module.exports = userController;
