const multer = require("multer");
const path = require("path");
const authControllers = require("../../controllers/auth");

const router = require("express").Router();

const upload = multer({
  dest: path.join(__dirname, "../../../public/uploads"),
  limits: {
    fieldSize: 1024 * 5, // max image size is 5 MB
  },
});

router.post("/register", upload.single("pfp"), authControllers.register);
router.post("/login", authControllers.login);

module.exports = router;
