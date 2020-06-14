const FacebookController = require('./controllers/facebook.controller');
const PvsController = require('./controllers/pvs.controller');
const paginate = require('express-paginate');
const PaginationMiddleware = require('./middlewares/pagination.middleware');
const AuthMiddleware = require('./middlewares/auth.middleware');

exports.routesConfig = function (app) {
  app.use(paginate.middleware(10, 50));

  app.route('/')
    .get(function (req, res) {
      res.json({ message: 'Default route not implemented' });
    });

  app.post('/admin/scrollnewposts', 
    AuthMiddleware.adminPermissionRequired,
    FacebookController.scrollNewPosts
  );
    
  app.get('/posts', [
    PaginationMiddleware.ensurePaginationLimit,
    PvsController.list
  ]);

  app.get('/posts/count', 
    PvsController.count
  );
    

  app.route('/posts/:postId')
    .get(PvsController.getById);  
};
