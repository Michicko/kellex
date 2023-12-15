const multer = require("multer");
const AppError = require("./AppError");
const slugify = require("slugify");

// multer storage
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/docs");
  },

  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    req.file = file;
    const filename = `${slugify(req.body.admissionNumber)}.${ext}`
    req.filename = filename;
    req.body.docUrl = `/public/uploads/docs/${filename}`;
    cb(null, filename);
  },
});

// multer filter
const multerFilter = (req, file, cb) => {
    if (file.fieldname === "doc") {
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new AppError("Not a pdf document! please upload only pdf documents", 400), false);
      }
  }
};

// upload
exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).single('doc')

