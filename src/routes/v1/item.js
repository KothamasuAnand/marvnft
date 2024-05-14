const itemControllers = require("../../controllers/item");
const router = require("express").Router();
const path = require("path");
const multer = require("multer");

const upload = multer({
  dest: path.join(__dirname, "../../../public/uploads"),
  limits: {
    fieldSize: 1024 * 5, // max image size is 5 MB
  },
});

router.get("/me", itemControllers.get);
router.post("/", upload.single("image"), itemControllers.create);
router.get("/", itemControllers.getAll);
router.get("/:itemId", itemControllers.getByExtId);
router.delete("/:itemId", itemControllers.deleteByExtId);
router.put("/:itemId", itemControllers.updateByExtId);

module.exports = router;
