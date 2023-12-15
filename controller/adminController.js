const path = require("path");

exports.getAdmin = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/admin-portal/dist", "index.html"));
}