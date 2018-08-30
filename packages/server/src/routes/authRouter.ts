import { logger } from "@trumpsaid/common";
import { NextFunction, RequestHandler, Response, Router } from "express";
import { default as RateLimit } from "express-rate-limit";
import passport from "passport";
import { IRequestWithUser } from "../helpers/passport";

// Base route is /
const router = Router();

const limiter = new RateLimit({
  windowMs: 30 * 1000,
  max: 10
});

router.get(
  "/login",
  limiter,
  // tslint:disable-next-line:no-object-literal-type-assertion
  passport.authenticate("auth0", {
    clientId: process.env.AUTH0_CLIENT_ID,
    domain: process.env.AUTH0_DOMAIN,
    redirectUri: process.env.AUTH0_CALLBACK_URL,
    audience: process.env.AUTH0_AUDIENCE,
    responseType: "code",
    scope: "openid profile"
  } as IAuth0PassportConfig),
  (_, res) => {
    res.redirect("/");
  }
);

// Perform session logout and redirect to homepage
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get(
  "/login/callback",
  passport.authenticate("auth0", {
    failureRedirect: "/"
  }),
  (req, res) => {
    logger.info(
      `Logged in user ${req.user.displayName} with ID ${req.user.user_id}`
    );
    res.redirect(`/admin?token=${req.user.accessToken}`);
  }
);

export const isAuthenticated: RequestHandler = (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
};

export default router;
