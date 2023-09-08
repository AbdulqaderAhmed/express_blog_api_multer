import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";

export const tokenValidation = expressAsyncHandler((req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const secret = process.env.ACCESS_TOKEN_SECRET;

  if (authHeader) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(403);
        throw new Error("Forbidden request!");
      } else {
        req.user = decoded;

        next();
      }
    });
  } else {
    req.user = undefined;
    res.status(401);
    throw new Error("User is unauthorized!");
  }

  if (!token) {
    res.status(401);
    throw new Error("Access denied!");
  }
});
