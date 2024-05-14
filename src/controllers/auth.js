const { sendError } = require("../utils/utils");
const User = require("../models/user");
const { hash, verifyHash } = require("../utils/encryption");
const { sign } = require("../utils/jwt");
const { mapUser } = require("../utils/user");
const path = require("path");
const fs = require("fs");

const authControllers = {
  register: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      // input validations
      if (!(username && password && email)) {
        return sendError(
          "Username, email and password are required!",
          400,
          res
        );
      }

      if (username.length < 6) {
        return sendError("Username must be at least 6 characters!", 400, res);
      }

      if (password.length < 8) {
        return sendError("Password must be at least 8 characters!", 400, res);
      }

      if (
        await User.findOne({ attributes: ["username"], where: { username } })
      ) {
        return sendError("Username already taken!", 409, res);
      }

      if (await User.findOne({ attributes: ["email"], where: { email } })) {
        return sendError("Email already taken!", 409, res);
      }

      // inserting into db
      const user = await User.create({
        username,
        email,
        password: await hash(password),
      });

      console.log("User created", { user });

      // storing pfp
      if (req.file) {
        const ext = path.extname(req.file.originalname).toLowerCase();
        const fileName = `${user.ext_id}${ext}`;
        const dest = path.join(req.file.destination, `/${fileName}`);

        if ([".png", ".jpg", ".jpeg"].includes(ext)) {
          fs.renameSync(req.file.path, dest);

          user.pfp = `uploads/${fileName}`;
          await user.save();
        } else {
          return sendError(
            "Only .png, .jpg, .jpeg files are supported!",
            409,
            res
          );
        }
      }

      // signing the jwt token
      const token = sign({ sub: username });

      res.json(mapUser({ ...user.toJSON(), token }));
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      if (!username) {
        return sendError("Username or email is required!", 400, res);
      }

      if (!password) {
        return sendError("Password is required!", 400, res);
      }

      let user = await User.findOne({
        where: {
          username: username,
        },
      });

      if (!user) {
        user = await User.findOne({
          where: {
            email: username,
          },
        });
      }

      if (!user) {
        return sendError("User not found!", 404, res);
      }

      // verifying password using the hash
      if (!(await verifyHash(password, user.password))) {
        return sendError("Incorrect password!", 401, res);
      }

      const token = sign({ sub: username });

      res.json(mapUser({ ...user.toJSON(), token }));
    } catch (err) {
      next(err);
    }
  },
};

module.exports = authControllers;
