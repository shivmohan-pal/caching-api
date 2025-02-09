const data = require("../db.json");
const { CreateError } = require("./errorHandling");
const CACHE_LIMIT = process.env.CACHE_LIMIT;

const CheckLimit = (req, res, next) => {
  const length = Object.keys(data).length;
  if (length < CACHE_LIMIT) {
    next();
  } else {
    next(CreateError(429, "Max rate limit Exceed"));
  }
};

module.exports = {
  CheckLimit,
};
