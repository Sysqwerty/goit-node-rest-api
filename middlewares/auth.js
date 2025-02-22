import passport from "passport";
import HttpError from "../helpers/HttpError.js";

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return next(HttpError(401));
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default auth;
