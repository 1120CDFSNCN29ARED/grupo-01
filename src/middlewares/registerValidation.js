const { body } = require("express-validator");

const registerValidation = [
	body("user").notEmpty().withMessage("Debes completar el nombre").bail(),
	body("email")
		.notEmpty()
		.withMessage("Debes completar el email")
		.bail()
		.isEmail()
		.withMessage("Debes completar un email válido"),
	body("password")
		.notEmpty()
		.withMessage("Debes completar la contraseña")
		.bail()
		.isLength({ min: 8 })
		.withMessage("La contraseña debe ser más larga"),
];

module.exports = registerValidation;
