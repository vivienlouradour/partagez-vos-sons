const FacebookPostModel = require('../models/facebookPost.model');
const paginate = require('express-paginate');

exports.list = async (req, res) => {
  const [results, itemCount] = await Promise.all([
    FacebookPostModel.list(req.query.limit, req.skip, req.query.message),
    FacebookPostModel.count(req.query.message)
  ]);

  const pageCount = Math.ceil(itemCount / req.query.limit);
  if (req.accepts('json')) {
    // inspired by Stripe's API response for list objects
    res.json({
      object: 'list',
      has_more: paginate.hasNextPages(req)(pageCount),
      count: results.length,
      data: results
    });
  } else {
    res.render('users', {
      users: results,
      pageCount,
      itemCount,
      pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
    });
  }
  
};

exports.getById = (req, res) => {
  FacebookPostModel.findById(req.params.postId)
    .then((result) => {
      res.status(200).send(result);
    });
};