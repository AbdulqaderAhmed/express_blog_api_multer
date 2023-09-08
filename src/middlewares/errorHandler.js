import { constants } from "../../constants.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = req.statusCode ? req.statusCode : 500;
  switch (statusCode) {
    case constants.BAD_REQUEST:
      res.json({ title: "Bad request!", message: err.message });
      break;
    case constants.FORBIDDEN:
      res.json({ title: "Forbidden request", message: err.message });
      break;
    case constants.PAGE_NOT_FOUND:
      res.json({ title: "PAGE NOT FOUND", message: err.message });
      break;
    case constants.UNAUTHORIZE:
      res.json({ title: "Unauthorized request", message: err.message });
      break;
    case constants.DUPLICATE:
      res.json({ title: "Duplicate entry", message: err.message });
      break;
    case constants.SERVER_ERROR:
      res.json({ title: "Server error", message: err.message });
      break;
  }
};
