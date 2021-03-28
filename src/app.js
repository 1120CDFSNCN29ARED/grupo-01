const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const cookies = require("cookie-parser");

const app = express();
app.use(express.urlencoded({ extended: false }));

const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");

const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));
app.use(
	session({
		secret: "Mi mensaje secreto",
		resave: false,
		saveUninitialized: true,
	})
);

app.use(cookies());
app.use(userLoggedMiddleware);

app.use(methodOverride("_method"));

app.listen(3000, () => {
	console.log("Servidor corriendo en el puerto 3000");
});

app.set("view engine", "ejs");

const homeRouter = require("./routers/homeRouter");

app.use("/", homeRouter);

const productRouter = require("./routers/productRouter");
app.use("/productDetail", productRouter);

const userRouter = require("./routers/userRouter");

app.use("/user", userRouter);
