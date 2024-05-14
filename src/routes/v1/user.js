const userControllers = require("../../controllers/user");

const router = require("express").Router();

router.get("/", userControllers.getAll);
router.get("/me", userControllers.get);
router.delete("/me", userControllers.delete);
router.get("/:userId", userControllers.getByExtId);

module.exports = router;
