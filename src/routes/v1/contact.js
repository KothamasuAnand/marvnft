const contactControllers = require("../../controllers/contact");
const router = require("express").Router();

router.post("/", contactControllers.create);
router.get("/", contactControllers.getAll);

module.exports = router;
