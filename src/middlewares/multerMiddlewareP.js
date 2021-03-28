const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const folder = path.join(__dirname, "../../public/images/users");
		// if(file.mimetype!="image/jpeg"){
		//     return cb(new Error("Solo se aceptan imagenes en jpg"))
		// }
		cb(null, folder);
	},
	filename: (req, file, cb) => {
		const imageName = Date.now() + path.extname(file.originalname);
		cb(null, imageName);
	},
});

const uploadFilep = multer({ storage });

module.exports = uploadFilep;
