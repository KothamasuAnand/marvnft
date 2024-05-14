const router = require("express").Router();

const userRoutes = require("./user");
const authRoutes = require("./auth");
const itemRoutes = require("./item");
const contactRoutes = require("./contact");
const categoryRoutes = require("./category");
// sample root route
router.get("/", (req, res) => {
  res.send("Welcome to MARV NFT API. Nothing to see here.");
});

router.use("/users", userRoutes); // /users/me
router.use("/auth", authRoutes); // /auth/register
router.use("/items", itemRoutes);
router.use("/contact", contactRoutes);
router.use("/category", categoryRoutes);

module.exports = router;
