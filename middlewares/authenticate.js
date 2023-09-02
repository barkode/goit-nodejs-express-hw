const { HttpError } = require("../utils");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

// without db query
// const authenticate = async (req, res, next) => {
//   try {
//     const { authorization = "" } = req.headers;
//     const [bearer, token] = authorization.split(" ");
//     if (bearer === "Bearer" && token) {
//       const decoded = jwt.verify(token, SECRET_KEY);
//       req.user = decoded;
//       next();
//     }
//   } catch {
//     next(HttpError(401));
//   }
// };

// with db query

const authenticate = async (req, res, next) => {
  console.table(req);
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = authenticate;
