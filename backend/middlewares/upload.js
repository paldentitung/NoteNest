const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === ".pdf") cd(null, "uploads/pdf");
    else cd(null, "uploads/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
module.exports = upload;
