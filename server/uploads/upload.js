const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary-v2");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "fixflow/complaints",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

module.exports = upload;