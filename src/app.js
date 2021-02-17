const express = require("express");
const path = require("path");

const app = express();

const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));

app.listen(3000, () => {
	console.log("Servidor corriendo en el puerto 3000");
});

app.set("view engine", "ejs");

const homeRouter = require("./routers/homeRouter");

app.get("/", homeRouter);

const productRouter = require("./routers/productRouter");

app.get("/productDetail", productRouter);
app.get("/productCart", productRouter);
app.get("/addProduct", productRouter);

const userRouter = require("./routers/userRouter");

app.get("/register", userRouter);
app.get("/login", userRouter);

app.get("/addProduct", (req, res) => {
	res.render(path.resolve(__dirname, "./views/products/addProduct.ejs"));
});
