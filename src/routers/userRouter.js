var express = require("express");
const { body, validationResult } = require("express-validator");
var router = express.Router();

const userController = require("../controllers/userController");
const registerValidation = require("../middlewares/registerValidation");

const uploadFilep = require("../middlewares/multerMiddlewareP");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/register", guestMiddleware, userController.register);
router.post(
	"/register",
	uploadFilep.single("image"),
	registerValidation,
	userController.processRegister
);

router.get("/login", guestMiddleware, userController.login);
router.post("/login", uploadFilep.single("image"), userController.loginProcess);

router.get("/logout", userController.logout);

router.get("/profile", authMiddleware, userController.profile);
router.post(
	"/profile",
	uploadFilep.single("profile_image"),
	userController.update
);

module.exports = router;
