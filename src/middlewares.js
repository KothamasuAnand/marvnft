const cors = require("cors");
const routes = require("./routes");
const bodyParser = require("body-parser");
const { verify } = require("./utils/jwt");
const User = require("./models/user");
const { sendError } = require("./utils/utils");

function config(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // enabling cors
  app.use(cors());

  // logging information about request
  app.use((req, res, next) => {
    console.log("Path:", req.path);
    console.log("Original URL:", req.originalUrl);

    next();
  });

  // checking for authorization token
  app.use(async (req, res, next) => {
    try {
      // no token needed for auth routes
      if (
        req.path === "/api/v1" ||
        req.path.includes("/auth/") ||
        (req.path.endsWith("/items") && req.method === "GET")
      ) {
        next();
      } else {
        const token = req.get("Authorization");

        // decoding the jwt token
        const decoded = verify(token);

        if (!decoded) {
          return sendError("Unauthorized! Please login again.", 401, res);
        } else {
          const user = await User.findOne({
            attributes: ["id"],
            where: { username: decoded.sub },
          });

          if (!user) {
            return sendError("Unauthorized! Please login again.", 401, res);
          } else {
            req.user = user.id;
            next();
          }
        }
      }
    } catch (err) {
      console.log(err);

      sendError("Unauthorized! Please login again.", 401, res);
    }
  });

  // adding routes
  app.use("/api", routes);

  // error handler
  app.use((err, req, res, next) => {
    if (!err) return next();

    console.log(err);

    // respond with error
    return sendError(
      "Something went wrong! Please report this incident to the team to investigate further.",
      err.status || 500,
      res
    );
  });
}

module.exports = { config };
