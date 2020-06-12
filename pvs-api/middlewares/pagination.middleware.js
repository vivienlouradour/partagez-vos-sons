//Ensure that "limit" param is correctly set in request for pagination
exports.ensurePaginationLimit = (req, res, next) => {
  if (req.query.limit <= 5) req.query.limit = 5;
  if (req.query.limit >= 50) req.query.limit = 50
  
  return next();
};