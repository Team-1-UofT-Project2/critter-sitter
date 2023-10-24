const multer = require("multer");
const path = require("path");

const filestorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//       cb(null, true);
//   } else {
//       //cb(null, false);
//       cb(new Error('upload correct file type'))
//   }
// };

const upload = multer({
  storage: filestorageEngine,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  
});

module.exports = {
  upload: upload,
};
