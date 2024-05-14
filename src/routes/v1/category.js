const categoryControllers = require("../../controllers/category");
const router = require("express").Router();

router.post("/", categoryControllers.create);
router.get("/", categoryControllers.getAll);

module.exports = router;
